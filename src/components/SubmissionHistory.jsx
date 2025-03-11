import { ChevronRightIcon } from '@heroicons/react/20/solid'

const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ㅎㅇ',
    problem_id: '메시지 복호화',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 2,
    href: '#',
    projectName: 'mobile-api',
    problem_id: 'two sum',
    status: 'online',
    statusText: 'Deployed 3m ago',
    description: 'Deploys from GitHub',
    environment: 'Production',
  },
  {
    id: 3,
    href: '#',
    projectName: 'tailwindcss.com',
    problem_id: '섬 탈출하기',
    status: 'offline',
    statusText: 'Deployed 3h ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 4,
    href: '#',
    projectName: 'api.protocol.chat',
    problem_id: 'Protocol',
    status: 'error',
    statusText: 'Failed to deploy 6d ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
]
// id
// problem_id
// language_id
// final_result
// submitted_code
// submitted_at
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// {
//   "id": 51,
//   "user_id": 101,
//   "problem_id": 1,
//   "language_id": 2,
//   "final_result": "SOL",
//   "submitted_code": "def solution(n, friends):\n\t# 각 사람의 친구 관계를 저장할 인접 리스트 생성\n\tgraph = [[] for _ in range(n)]\n\t\n\t# 주어진 친구 관계로 그래프(인접 리스트) 구성\n\tfor a, b in friends:\n\t\tgraph[a].append(b)\n\t\tgraph[b].append(a)\n\t...",
//   "result_detail": "",
//   "submitted_at": "2025-03-03T15:00:00Z"
// }
// 문제 제목도 보여줘야 함
// problemId를 사용해서 가져와야 할듯한데.. 각각의

// async function fetchSubmissions() {
//   try {
//     const response = api.get
//   }
// }

export default function SubmissionHistory() {
  return (
    <ul role="list" className="divide-y divide-gray/5">
      {deployments.map((deployment) => (
        <li key={deployment.id} className="relative flex items-center space-x-4 py-4">
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div className={classNames(statuses[deployment.status], 'flex-none rounded-full p-1')}>
                <div className="size-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm/6 font-semibold text-gray-900">
                <a href={deployment.href} className="flex gap-x-2">
                  <span className="truncate">{deployment.problem_id}</span>
                  <span className="text-gray-400">/</span>
                  <span className="whitespace-nowrap">{deployment.projectName}</span>
                  <span className="absolute inset-0" />
                </a>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs/5 text-gray-400">
              <p className="truncate">{deployment.description}</p>
              <svg viewBox="0 0 2 2" className="size-0.5 flex-none fill-gray-300">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="whitespace-nowrap">{deployment.statusText}</p>
            </div>
          </div>
          <div
            className={classNames(
              environments[deployment.environment],
              'flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
            )}
          >
            {deployment.environment}
          </div>
          <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
        </li>
      ))}
    </ul>
  )
}
