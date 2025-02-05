// Description.js
'use client';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProblems } from "@/store/slices/problemSlice"

export default function Description(props) {
  const dispatch = useDispatch();
  const problem = useSelector((state) => state.problem.data);
  const status = useSelector((state) => state.problem.status);
  const error = useSelector((state) => state.problem.error);

  useEffect(() => {
    // 데이터가 없고, 아직 로딩되지 않은 상태일 때만 패칭
    if (!problem && status === 'idle') {
      dispatch(fetchProblems());
    }
  }, [problem, status, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="h-full w-full overflow-y-scroll prose p-4">
      <h2>{problem?.title}</h2>
      <div className="pb-5" dangerouslySetInnerHTML={{ __html: problem?.content }}></div>

    </div>
  );
}