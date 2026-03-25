export const Footer = () => {
  return (
    <footer className="bg-dark-grey py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2026 Alexandr Anushko. All rights reserved.
          </div>
          <div className="text-2xl font-bold">A.</div>
          <div className="text-gray-400 text-sm">
            Built with Next.js & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
