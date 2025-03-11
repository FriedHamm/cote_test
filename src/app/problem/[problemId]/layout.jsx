import BreadCrumb from "@/app/problem/BreadCrumb";
import ProblemContent from "@/app/problem/ProblemContent";
import api from "@/axios/axiosConfig";
import {formatLanguages} from "@/app/utils/formatLanguages";
import ErrorGuard from "@/components/ErrorGuard";

async function fetchProblem(problemId) {
  try {
    const response = await api.get(`/cote/v1/problems/${problemId}?fields=problem`);
    return response.data.title;
  } catch (error) {
    console.log('문제 페이지 메타 태그용 타이틀 가져오다가 실패함',error);
  }
}

// 부모 메타가 동적일 때에는 무조건 await을 붙일 것
export async function generateMetadata({ params }, parent) {

  // 지금 현재는 이름을 이렇게 설정해놨지만 나중에는 문제 제목을 받아서 처리해야 함
  const {problemId}  = await params;
  const title = await fetchProblem(problemId);
  const dynamicTitle = title ? `코딩테스트 문제 ${title}` : `코딩테스트 문제 ${problemId}`;

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

async function fetchInitCode(problemId) {
  try {
    const response = await api.get(`/cote/v1/problems/${problemId}/initcodes`);
    return response.data;
  } catch (error) {
    if (error.response || error.request) {
      throw new Error(`초기 코드를 가져오는데 문제가 발생했습니다. ${error.status}`);
    } else {
      throw error;
    }
  }
}

async function fetchProblemDetail(problemId) {
  try {
    const response = await api.get(`/cote/v1/problems/${problemId}?fields=all`);

    return {title: response.data.title, problemDetail: response.data.problemdetail};
  } catch (error) {
    if (error.response || error.request) {
      throw new Error(`문제 정보를 가져오는데 문제가 발생했습니다. ${error.status}`);
    } else {
      throw error;
    }
  }
}

// 언어 정보 가져오기
async function fetchLanguage() {

  try {
    const response = await api.get('/cote/v1/languages');
    return response.data;
  } catch (error) {
    if (error.response || error.request) {
      throw new Error(`언어 정보를 가져오는데 문제가 발생하였습니다. ${error.status}`);
    } else {
      throw error;
    }
  }
}



export default async function ProblemLayout({params, children}) {
  const {problemId} = await params;
  let problemDetail = null;
  let languages = null;
  let initCode = null;
  let errorMessage = [];

  try {
    problemDetail = await fetchProblemDetail(problemId);
  } catch (error) {
    errorMessage.push(error.message)
  }

  try {
    languages = await fetchLanguage();
  } catch (error) {
    errorMessage.push(error.message);
  }

  try {
    initCode = await fetchInitCode(problemId);
  } catch (error) {
    errorMessage.push(error.message);
  }

  const formattedLanguage = formatLanguages(languages);

  const codeMapping = {};
  formattedLanguage.forEach(lang => {
    const matchingCode = initCode?.find(item => item.language_id === lang.id);
    if (matchingCode) {
      codeMapping[lang.formattedLanguage] = { language:lang.formattedLanguage, languageId: lang.id, code: matchingCode.template_code };
    }
  });

  if (errorMessage) {
    return <ErrorGuard errorMessage={errorMessage} redirectUrl={`/problems/1`} />;
  }
  return (
    <div className="bg-[#FFF0F0] min-h-screen overflow-y-scroll h-screen pt-8">
      <BreadCrumb problemName={problemDetail?.title}/>
      <ProblemContent initCode={codeMapping} problemDetail={problemDetail?.problemDetail} title={problemDetail?.title}>{ children }</ProblemContent>
    </div>
  )
}

