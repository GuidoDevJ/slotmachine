interface PlayButton {
  fn?: () => void;
  disabled?: boolean;
}

const PlayButton = ({ fn, disabled = false }: PlayButton) => {
  return (
    <button
      disabled={disabled}
      onClick={fn}
      aria-label={disabled ? 'Girando carretes...' : 'Jugar - Girar carretes'}
      className={`rounded-full w-24 h-24 text-center bg-gradient-to-b from-[#C8191B] to-[#602E44] text-xl text-white tracking-widest font-bold transition-all transform active:scale-95 active:shadow-inner sm:w-24 sm:h-24 sm:text-xl md:w-28 md:h-28 lg:w-28 lg:h-28 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 ${
        disabled ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:scale-105 cursor-pointer'
      }`}
    >
      {disabled ? (
        <span className="flex flex-col items-center gap-1">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      ) : (
        'Jugar'
      )}
    </button>
  );
};

export default PlayButton;
