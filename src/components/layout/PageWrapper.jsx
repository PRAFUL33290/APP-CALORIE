export default function PageWrapper({ children, noPadding = false, noNav = false }) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] max-w-md mx-auto relative">
      <div className={`${noPadding ? '' : 'px-4 pt-4'} ${noNav ? 'pb-4' : 'pb-24'}`}>
        {children}
      </div>
    </div>
  );
}
