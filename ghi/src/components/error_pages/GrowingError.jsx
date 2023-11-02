import LeafyBackground from "../LeafyBackground";

export default function GrowingError() {
  return (
    <>
      <div className="flex flex-col place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <p className="text-5xl z-40 pb-8 text-center">
          Whoops! This page is still growing.
        </p>
        <p className="text-5xl z-40 pb-8 text-center">Check back next thyme!</p>
      </div>
    </>
  );
}
