import { Element } from "@craftjs/core";
import { SettingsControl } from "../settings-control";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "../ui/card";
import { NodeButton } from "./button";
import { withNode } from "./connector";

interface NodeCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const draggable = true;
const droppable = true; // Can drop items into to this component

export const NodeCardHeader = withNode(CardHeader, {
  droppable,
});

export const NodeCardTitle = withNode(CardTitle, {
  draggable,
  droppable,
});

NodeCardTitle.craft = {
  ...NodeCardTitle.craft,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeCardDescription = withNode(CardDescription, {
  draggable,
  droppable,
});

NodeCardDescription.craft = {
  ...NodeCardDescription.craft,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeCardContent = withNode(CardContent, {
  droppable,
});

export const NodeCardFooter = withNode(CardFooter, {
  droppable,
});

export const NodeCardContainer = withNode(Card, {
  draggable,
  droppable,
});

export const NodeCardImage = withNode(CardImage, {
  droppable,
  draggable,
});

NodeCardImage.craft = {
  ...NodeCardImage.craft,
  props: {
    className: "p-6 m-2",
    file: "https://wallpaperaccess.com/full/118569.jpg",
    alt: "awodkaodkod",
  },
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeCard = ({ ...props }: NodeCardProps) => {
  return (
    <NodeCardContainer {...props}>
      <Element
        canvas
        id='card-header'
        is={NodeCardHeader as typeof NodeCardHeader & string}
      >
        <NodeCardTitle>Card Title</NodeCardTitle>
        <NodeCardDescription>Card Description</NodeCardDescription>
      </Element>
      <Element
        canvas
        id='card-content'
        is={NodeCardContent as typeof NodeCardContent & string}
      >
        <NodeCardImage>wadjaid</NodeCardImage>
      </Element>
      <Element
        canvas
        id='card-footer'
        is={NodeCardFooter as typeof NodeCardFooter & string}
      >
        <NodeButton>Footer button</NodeButton>
      </Element>
    </NodeCardContainer>
  );
};

NodeCard.craft = {
  ...NodeCard.craft,
  displayName: "Card",
  props: {
    className: "p-6 m-2",
  },
  custom: {
    importPath: "@/components/card",
  },
  related: {
    toolbar: SettingsControl,
  },
};
