import NotFoundSvg from '@/assets/backgrounds/not-found.svg';
export const NotFound = () => {
  return (
    <main className="min-h-full">
      <section className="min-h-full pt-10">
        <article className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold antialiased">
            Sorry, this page doesn't exist.
          </h1>
          <div className="w-96 h-96 mx-auto">
            <img className="w-full" src={NotFoundSvg} alt="Not found" />
          </div>
        </article>
      </section>
    </main>
  );
};
