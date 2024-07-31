import clsx from "clsx";
import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLogger } from "@/hooks/useLogger";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  className?: ComponentPropsWithoutRef<"div">["className"];
};

export const Modal: FC<ModalProps> = (props) => {
  const { children, isOpen, className } = props;
  const logger = useLogger().logger;

  const modalRoot = document.getElementById("portal");
  if (modalRoot == null) {
    logger.error({ message: "modalRoot not found" });
    return null;
  }

  return isOpen
    ? createPortal(
        <div
          data-testid="overlay"
          className="fixed inset-0 flex flex-col items-center justify-center bg-black/50"
        >
          <div
            data-testid="modal"
            className={clsx("rounded bg-white shadow-lg", className)}
          >
            {children}
          </div>
        </div>,
        modalRoot,
      )
    : null;
};
