const CategoriesLoading = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#DF3132] rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Cargando categorias...</p>
      </div>
    </div>
  );
};

export default CategoriesLoading;
