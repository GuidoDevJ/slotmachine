const Loading = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#1a0a1e] via-[#2d1233] to-[#0f0a1a] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-white/20 border-t-[#DF3132] rounded-full animate-spin" />
        <p className="text-gray-400 text-sm animate-pulse">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
