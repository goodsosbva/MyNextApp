import { type PropsWithChildren } from "react";

function SigningLayout(props: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {props.children}
    </div>
  );
}

export default SigningLayout;
