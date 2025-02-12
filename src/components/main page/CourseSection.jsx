const features = [
  {
    name: '코딩테스트 [ ALL IN ONE ]',
    description:
      '시각적 자료로 코드 동작 원리를 명확하게 보여주며, 기업 코딩테스트에서 자주 출제되는 다양한 문제 유형을 한 번에 정복할 수 있는 강의입니다.',
    href: 'https://www.inflearn.com/course/%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%9E%85%EB%AC%B8-%ED%8C%8C%EC%9D%B4%EC%8D%AC'
  },
  {
    name: '기출로 대비하는 개발자 전공면접 [CS 완전정복]',
    description:
      '실제 기출 문제를 분석해 면접에서 요구하는 핵심 전공 지식을 체계적으로 정리한 강의로, 면접 준비에 실질적인 도움을 제공합니다.',
    href: 'https://www.inflearn.com/course/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%A0%84%EA%B3%B5%EB%A9%B4%EC%A0%91-cs-%EC%99%84%EC%A0%84%EC%A0%95%EB%B3%B5'
  },
  {
    name: '카카오 퇴사자가 누설하는 [웹개발자 취업 비밀노트]',
    description:
      '카카오 전 개발자의 생생한 경험을 바탕으로, 웹개발자로 취업하기 위해 꼭 알아야 할 전략과 노하우를 담은 강의입니다.',
    href: 'https://www.inflearn.com/course/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%B7%A8%EC%97%85-%EB%B9%84%EB%B0%80-%EB%85%B8%ED%8A%B8'
  },
]

export default function CourseSection() {
  return (
    <div className="bg-[#FFF0F0] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            개발자 취업 성공을 위한 필수 강의
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600 break-keep">
            실전 경험과 최신 트렌드를 반영한 커리큘럼으로, 코딩 테스트부터 면접 준비까지 모든 단계를 완벽하게 대비하세요.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <ul className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, i) => (
              <div key={feature.name} className="flex flex-col text-center break-keep">
                <li className="text-base/7 font-semibold text-gray-900">
                  <picture className="block mb-6">
                    <source srcSet={`/course/course${i + 1}.avif`} type="image/avif"/>
                    <source srcSet={`/course/course${i + 1}.webp`} type="image/webp"/>
                    <img
                      src={`/course/course${i + 1}.png`}
                      alt="Course 1"
                      width="60%"
                      className="rounded-lg mx-auto aspect-video"
                    />
                  </picture>
                  {feature.name}
                </li>
                <div className="mt-1 flex flex-auto flex-col text-base/7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} rel="noopener noreferrer" target="_blank" className="text-sm/6 font-semibold text-indigo-600">
                      자세히 알아보기 <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}