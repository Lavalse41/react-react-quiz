import { ChildrenType } from "../interface/ChildrenType";

function Main({ children }: ChildrenType) {
  return <main className="main">{children}</main>;
}

export default Main;
