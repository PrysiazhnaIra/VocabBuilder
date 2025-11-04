import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

const portalRoot = document.getElementById("modal-root");

if (!portalRoot) {
  throw new Error('Element with id "modal-root" not found in the DOM.');
}

const modalRootElement: Element = portalRoot;

export default function ModalPortal({ children }: ModalPortalProps) {
  return createPortal(children, modalRootElement);
}
