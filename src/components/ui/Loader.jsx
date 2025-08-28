import React from "react";

function Loader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-7 h-7 rounded-full relative animate-rotate">
        <div className="absolute inset-0 z-10 rounded-full border-2 border-foreground animate-prixClipFix"></div>
        <div className="absolute inset-0 z-0 rounded-full border-2 border-muted-foreground/15 "></div>
      </div>
      <span className="text-sm text-muted-foreground/80 mt-1">Loading...</span>
    </div>
  );
}

export default Loader;
