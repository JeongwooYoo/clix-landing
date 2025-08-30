// Module shims for packages without NodeNext type export resolution compatibility
// (Lucide and clsx provide types, but in some NodeNext configs resolution may fail)

declare module "lucide-react";
declare module "clsx";
