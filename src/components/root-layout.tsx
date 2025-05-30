import { type ComponentProps } from "react";

export const LayoutRoot = (props: ComponentProps<"div">) => {
  return (
    <div {...props} data-slot="layout-root" className="w-full space-y-6 p-6" />
  );
};

export const LayoutHeader = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className="flex w-full items-center justify-between"
      data-slot="layout-header"
    />
  );
};

export const LayoutHeaderContent = (props: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      data-slot="layout-header-content"
      className="w-full space-y-1"
    />
  );
};

export const LayoutHeaderTitle = (props: ComponentProps<"h1">) => {
  return (
    <h1
      {...props}
      data-slot="layout-header-title"
      className="text-2xl leading-none font-bold tracking-tight"
    />
  );
};

export const LayoutHeaderDescription = (props: ComponentProps<"span">) => {
  return (
    <span
      {...props}
      data-slot="layout-header-description"
      className="text-muted-foreground text-sm"
    />
  );
};

export const LayoutContent = (props: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      data-slot="layout-content"
      className="flex items-center gap-2"
    />
  );
};

export const LayoutActions = (props: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      data-slot="layout-actions"
      className="flex items-center gap-2"
    />
  );
};
