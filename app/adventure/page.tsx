import AdventureDescription from '@/components/adventureDescription'

export default function Home() {
  return (
    <div className="flex items-center h-full flex-col gap-5 justify-center">
      <div className="flex">
        <AdventureDescription />
      </div>

      {/*<div className="example">*/}
      {/*  <h1 className="font-bold text-4xl mb-4">Retro Buttons</h1>*/}
      {/*  <a className="btn primary" href="#">*/}
      {/*    Start*/}
      {/*  </a>*/}
      {/*  <a className="btn secondary" href="#">*/}
      {/*    Select*/}
      {/*  </a>*/}
      {/*  <a className="btn tertiary" href="#">*/}
      {/*    Reset*/}
      {/*  </a>*/}
      {/*  <a className="btn" href="#">*/}
      {/*    Cancel*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
  )
}
