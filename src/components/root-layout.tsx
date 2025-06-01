import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const LayoutRoot = ({ className, ...rest }: ComponentProps<"div">) => {
  return (
    <div
      {...rest}
      id="layout-root"
      role="main"
      data-slot="layout-root"
      className={cn("w-full space-y-6 p-6", className)}
    />
  );
};

export const LayoutHeader = (props: ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      id="layout-header"
      data-slot="layout-header"
      className={cn("flex w-full items-center justify-between", className)}
    />
  );
};

export const LayoutHeaderContent = (props: ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      id="layout-header-content"
      data-slot="layout-header-content"
      className={cn("w-full space-y-1", className)}
    />
  );
};

export const LayoutHeaderTitle = (props: ComponentProps<"h1">) => {
  const { className, ...rest } = props;
  return (
    <h1
      {...rest}
      id="layout-header-title"
      data-slot="layout-header-title"
      className={cn(
        "text-2xl leading-none font-bold tracking-tight",
        className,
      )}
    />
  );
};

export const LayoutHeaderDescription = (props: ComponentProps<"span">) => {
  const { className, ...rest } = props;
  return (
    <span
      {...rest}
      id="layout-header-description"
      data-slot="layout-header-description"
      className={cn("text-muted-foreground text-sm", className)}
    />
  );
};

export const LayoutContent = (props: ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      id="layout-content"
      data-slot="layout-content"
      className={cn("flex items-center gap-2", className)}
    />
  );
};

export const LayoutActions = (props: ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      id="layout-actions"
      data-slot="layout-actions"
      className={cn("flex items-center gap-2", className)}
    />
  );
};
