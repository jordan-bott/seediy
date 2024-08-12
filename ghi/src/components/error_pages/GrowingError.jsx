import LeafyBackground from "../LeafyBackground";

export default function GrowingError() {
  return (
    <>
      <div className="flex h-[100vh] w-[100vw] flex-col place-content-center items-center">
        <LeafyBackground />
        <p className="z-40 pb-8 text-center text-5xl">
          Whoops! This page is still growing.
        </p>
        <p className="z-40 pb-8 text-center text-5xl">Check back next thyme!</p>
      </div>
    </>
  );
}
