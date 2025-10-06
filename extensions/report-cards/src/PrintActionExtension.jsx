import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const { data } = shopify;
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (data?.selected?.length) {
      const orderId = data.selected[0].id;
      // The path to the backend function. The CLI will proxy this to the correct function.
      setSrc(`/api/print-report-card?orderId=${orderId}`);
    }
  }, [data.selected]);

  return (
    <s-admin-print-action src={src}>
      <s-stack direction="block">
        <s-text type="strong">Print Report Cards</s-text>
        <s-text>Generates one label per line item.</s-text>
      </s-stack>
    </s-admin-print-action>
  );
}
