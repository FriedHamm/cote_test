'use client'
import Link from "next/link";
import api from "@/axios/axiosConfig";
import {useDispatch, useSelector} from "react-redux";
import {addAlert} from "@/store/slices/alertSlice";
import {useRouter} from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProblemsTable({ problemList }) {

  const userRole = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/administrator/v1/cote/problems/${id}`);
      dispatch(addAlert({type: 'info', message: '문제가 정상적으로 삭제되었습니다.'}));
      router.refresh();

    } catch (error) {
      if (error.response) {
        if (error.status === 403 || error.status === 401) {
          dispatch(addAlert({type: 'warning', message: '권한이 없습니다.'}));
        } else if (error.status === 404) {
          dispatch(addAlert({type: 'warning', message: '해당 문제가 존재하지 않습니다.'}));
        } else if (error.status === 500) {
          dispatch(addAlert({type: 'error', message: '내부 서버 에러입니다. 나중에 다시 요청해주세요.'}));
        } else {
          dispatch(addAlert({type: 'error', message: `알 수 없는 에러입니다. ${error.status}`}));
        }
      } else if (error.request) {
        dispatch(addAlert({type: 'error', message: '네트워크를 확인한 후 해결이 안된다면 문의 바랍니다.'}));
      } else {
        dispatch(addAlert({type: 'error', message: `알 수 없는 에러입니다. ${error.message}`}));
      }
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
      <div className="flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <colgroup>
                {userRole === 'S' ? (
                  <>
                    <col className="w-[40%] sm:w-[60%]"/>{/* 제목 */}
                    <col className="w-[15%] sm:w-[10%]"/>{/* 난이도 */}
                    <col className="w-[15%] sm:w-[10%]"/>{/* 정답률 */}
                    <col className="w-[15%] sm:w-[10%]"/>{/* 문제 삭제 */}
                    <col className="w-[15%] sm:w-[10%]"/>{/* 문제 삭제 */}
                  </>
                ) : (
                  <>
                    <col className="w-[60%] sm:w-[70%]"/>{/* 제목 */}
                    <col className="w-[20%] sm:w-[15%]"/>{/* 난이도 */}
                    <col className="w-[20%] sm:w-[15%]"/>{/* 정답률 */}
                  </>
                )}
              </colgroup>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    난이도
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    정답률
                  </th>
                  {userRole === 'S' && (
                    <>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        수정
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        삭제
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {problemList.map((problem, problemIdx) => (
                  <tr key={problem.title}>
                    <td
                      className={classNames(
                        problemIdx !== problemList.length - 1 ? 'border-b border-gray-200' : '',
                        'px-3 py-4 text-sm text-gray-500 sm:table-cell'
                      )}
                    >
                      <Link href={`/problem/${problem.id}/description`} className="block truncate">
                        {problem.title}
                      </Link>
                    </td>
                    <td
                      className={classNames(
                        problemIdx !== problemList.length - 1 ? 'border-b border-gray-200' : '',
                        ' whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell',
                      )}
                    >
                      {problem.level}
                    </td>
                    <td
                      className={classNames(
                        problemIdx !== problemList.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                      )}
                    >
                      {Math.trunc(problem.attempt_num / problem.solve_num) * 100 || 0}
                    </td>
                    {userRole === 'S' && (
                      <>
                        <td
                          className={classNames(
                            problemIdx !== problemList.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          <Link
                            href={`/admin/problems/${problem.id}/edit`}
                            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            문제 수정하기
                          </Link>
                        </td>
                        <td
                          className={classNames(
                            problemIdx !== problemList.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => handleDelete(problem.id)}
                            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            문제 삭제하기
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
