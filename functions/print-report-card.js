export default {
  async fetch(request, env, ctx) {
    console.log("Backend function called.");
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    console.log(`Received orderId: ${orderId}`);

    if (!orderId) {
      console.error("Missing orderId");
      return new Response("Missing orderId", { status: 400 });
    }

    console.log(`Store domain: ${env.SHOPIFY_STORE_DOMAIN}`);
    console.log(`Access token loaded: ${env.SHOPIFY_ACCESS_TOKEN ? 'Yes' : 'No'}`);

    const query = `
      query getOrder($orderId: ID!) {
        order(id: $orderId) {
          name
          createdAt
          lineItems(first: 50) {
            edges { node { id name sku quantity } }
          }
          customer { firstName lastName email }
        }
      }`;

    try {
      const response = await fetch(`https://${env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": env.SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables: { orderId } }),
      });

      const responseBody = await response.json();
      console.log("Shopify API response:", JSON.stringify(responseBody, null, 2));

      if (responseBody.errors) {
        console.error("Shopify API errors:", responseBody.errors);
        return new Response(JSON.stringify(responseBody.errors), { status: 500, headers: { "Content-Type": "application/json" } });
      }

      const order = responseBody.data.order;
      const pages = order.lineItems.edges.map(({ node }) => label(node, order));
      const html = wrapHTML(pages);

      return new Response(html, {
          headers: {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*",
          }
      });
    } catch (error) {
      console.error("Error fetching from Shopify API:", error);
      return new Response("Error fetching from Shopify API", { status: 500 });
    }
  }
}

function label(item, order) {
  return `
  <div class="label">
    <h1>UNDERITALL.</h1>
    <p><strong>Client:</strong> ${order.customer?.firstName || ""} ${order.customer?.lastName || ""}</p>
    <p><strong>Order:</strong> ${order.name}</p>
    <p><strong>Pad:</strong> ${item.name}</p>
    <p><strong>Qty:</strong> ${item.quantity}</p>
    <p><strong>Email:</strong> <!--email_off-->${order.customer?.email || ""}<!--/email_off--></p>
  </div>`;
}

function wrapHTML(pages) {
  return `
  <!DOCTYPE html>
  <html><head><title>Report Cards</title>
  <style>
    body{font-family:sans-serif;margin:1in;}
    .label{border:1px solid #ccc;padding:20px;width:6in;page-break-after:always;}
    h1{text-transform:uppercase;font-size:1.5em;margin-bottom:.2em;}
    p{margin:.3em 0;}
    @media print{body{margin:0}.label{page-break-after:always}}
  </style></head><body>${pages.join("
")}</body></html>`;
}
