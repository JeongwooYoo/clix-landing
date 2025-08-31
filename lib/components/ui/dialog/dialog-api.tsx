"use client";

import { overlay } from "overlay-kit";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import {
  DialogCancelButton,
  DialogConfirmButton,
} from "@/lib/components/ui/dialog/dialog-buttons";

export function dialog(
  render: (props: { isOpen: boolean; close: () => void }) => React.ReactNode
) {
  return overlay.open(({ isOpen, close }) => (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent>{render({ isOpen, close })}</DialogContent>
    </Dialog>
  ));
}

export function openConfirm({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return overlay.openAsync<boolean>(({ isOpen, close }) => (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <DialogCancelButton onClick={() => close(false)} variant="outline" />
          <DialogConfirmButton
            onClick={() => close(true)}
            variant="destructive"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ));
}

export async function openAlertAsync({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return overlay.openAsync<void>(({ isOpen, close }) => (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <DialogConfirmButton onClick={() => close()} variant="destructive" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ));
}

export function openAlert({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  dialog(({ close }) => (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      <DialogFooter>
        <DialogConfirmButton onClick={close} variant="destructive" />
      </DialogFooter>
    </>
  ));
}

export function DialogProvider({ children }: { children: React.ReactNode }) {
  return children;
}
