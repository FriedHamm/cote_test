'use client';

import {useContext} from "react";
import {ProblemContext} from "@/app/problem/[problemId]/[...tab]/ProblemContent";

export default function Description() {
  const {description, title} = useContext(ProblemContext);

  return (
    <div className="flex-grow overflow-y-scroll prose pt-5 pr-5 pl-5">
      <h2>{title}</h2>
      <div className="" dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
  );
}