import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProblemsTable({ problemList }) {

  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
      {/*<div className="sm:flex sm:items-center">*/}
      {/*  <div className="sm:flex-auto">*/}
      {/*    <h1 className="text-base font-semibold text-gray-900">Users</h1>*/}
      {/*    <p className="mt-2 text-sm text-gray-700">*/}
      {/*      A list of all the users in your account including their name, title, email and role.*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">*/}
      {/*    <button*/}
      {/*      type="button"*/}
      {/*      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
      {/*    >*/}
      {/*      Add user*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <colgroup>
                {/*<col className="w-[30%] sm:w-[20%]"/>*/}
                {/* 풀이 상태 */}
                <col className="w-[60%] sm:w-[70%]"/>
                {/* 제목 */}
                <col className="w-[20%] sm:w-[15%]"/>
                {/* 난이도 */}
                <col className="w-[20%] sm:w-[15%]"/>
                {/* 정답률 */}
              </colgroup>
              <thead>
                <tr>
                  {/*<th*/}
                  {/*  scope="col"*/}
                  {/*  className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"*/}
                  {/*>*/}
                  {/*  풀이 상태*/}
                  {/*</th>*/}
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

                </tr>
              </thead>
              <tbody>
                {problemList.map((problem, problemIdx) => (
                  <tr key={problem.title}>
                    {/*<td*/}
                    {/*  className={classNames(*/}
                    {/*    problemIdx !== problemList.length - 1 ? 'border-b border-gray-200' : '',*/}
                    {/*    'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',*/}
                    {/*  )}*/}
                    {/*>*/}
                    {/*  {problem.status}*/}
                    {/*</td>*/}
                    <td
                      className={classNames(
                        problemIdx !== problemList.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-break-spaces px-3 py-4 text-sm text-gray-500 sm:table-cell',
                      )}
                    >
                      <Link href={`/problem/${problem.id}/description`}>
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
