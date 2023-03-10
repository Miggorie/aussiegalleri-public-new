import { useContext } from "react";
import DogsContext, { DogsContextType } from "../context/DogsContext";

//This is a hook to get the DogContext a bit smaller and easier to import in other documents.

function useDogContext(): DogsContextType {
  return useContext(DogsContext);
}

export default useDogContext;
