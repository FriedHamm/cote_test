import SubmissionHistory from "@/components/SubmissionHistory";
import SubmissionDetail from "@/app/problem/[problemId]/submission/SubmissionDetail";

export default function Submission(props) {
  return (
    <div className="px-4 h-full">
      <SubmissionDetail/>
    </div>
  )
}