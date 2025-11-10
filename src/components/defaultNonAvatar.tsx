import React from "react";

const DefaultNonAvatar = ({username}: {username: string}) => {
  return (
    <div className="w-8 h-8 rounded-full bg-stone-100 outline-1 outline-stone-300 flex items-center justify-center hover:outline-stone-900 shrink-0">
      <p className="text-xs font-semibold">
        {username.slice(0, 2).toUpperCase()}
      </p>
    </div>
  );
};

export default DefaultNonAvatar;
