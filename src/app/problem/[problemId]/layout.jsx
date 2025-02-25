import BreadCrumb from "@/app/problem/BreadCrumb";
import ProblemContent from "@/app/problem/ProblemContent";

// 부모 메타가 동적일 때에는 무조건 await을 붙일 것
export async function generateMetadata({ params }, parent) {

  // 지금 현재는 이름을 이렇게 설정해놨지만 나중에는 문제 제목을 받아서 처리해야 함
  const {problemId}  = await params;
  const dynamicTitle = problemId ? `코딩테스트 문제 ${problemId}` : 'Nossi.Dev';

  // 부모 템플릿을 수동으로 적용
  const formattedTitle = `${dynamicTitle} - Nossi.Dev`;

  return {
    title: dynamicTitle,
    openGraph: {
      ...parent.openGraph,
      title: formattedTitle,
      url: problemId
        ? `https://cote.nossi.dev/problem/${problemId}`
        : parent.openGraph?.url,
    },
    twitter: {
      ...parent.twitter,
      title: formattedTitle,
    },
  };
}


async function fetch() {
  // 여기서 문제를 받아와야 함
  // 싹다 받아와야 하긴 함
}

export default function ProblemLayout({params, children}) {


  return (
    <div className="bg-[#FFF0F0] min-h-screen overflow-y-scroll h-screen pt-8">
      <BreadCrumb problemName=""/>
      <ProblemContent>{ children }</ProblemContent>
    </div>
  )
}

