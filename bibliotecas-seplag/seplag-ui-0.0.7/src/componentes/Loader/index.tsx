import { useAppSelectorSeplag } from "../../app/hook/hooks";
import { loaderSeplag } from "./loaderContent";

export function LoaderSeplag(props: Readonly<{ text?: string }>) {
  const isLoading =
    useAppSelectorSeplag((state) => state.loaderReducer.count) > 0;

  return isLoading ? loaderSeplag(props.text) : null;
}
