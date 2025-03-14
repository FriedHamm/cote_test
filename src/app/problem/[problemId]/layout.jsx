import BreadCrumb from "@/app/problem/BreadCrumb";
import {fetchProblemDetail} from "@/app/problem/[problemId]/[...tab]/page";
import ErrorGuard from "@/components/ErrorGuard";

export default async function ProblemLayout({children, params}) {
  const {problemId} = await params;
  let title;
  let errorMessage = [];

  try {
    title = (await fetchProblemDetail(problemId)).title;
  } catch (error) {
    errorMessage.push(error.message);
  }

  if (errorMessage.length) {
    console.log(errorMessage);
    return <ErrorGuard errorMessage={errorMessage} redirectUrl="/problems/1"/>
  }

  return (
    <div className="bg-[#FFF0F0] min-h-screen overflow-y-scroll h-screen pt-8">
      <BreadCrumb problemName={title}/>
      {children}
    </div>
  )
}

