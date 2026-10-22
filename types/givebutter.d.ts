import type { DetailedHTMLProps, HTMLAttributes } from "react";

type GivebutterWidgetProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  id: string;
  /** Pre-selects one of the campaign's suggested amounts. */
  amount?: string;
  /** "once" | "monthly" | "quarterly" | "yearly" */
  frequency?: string;
  align?: "left" | "center" | "right";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "givebutter-widget": GivebutterWidgetProps;
    }
  }
}
