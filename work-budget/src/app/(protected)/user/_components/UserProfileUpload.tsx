export function UserProfileUpload() {
  return (
    <div className="rounded-[14px] border border-dashed border-[#d7deec] bg-white px-8 py-5">
      <div className="mx-auto grid max-w-[260px] place-items-center gap-3 text-center">
        <span className="grid size-[35px] place-items-center rounded-full bg-[#f3f6fb] text-[20px] text-[var(--primary)]">
          ↑
        </span>
        <p className="text-xs leading-[19px] text-[var(--muted)]">
          Click to upload or drag and drop SVG, PNG, JPG or GIF (max, 800x400px)
        </p>
      </div>
    </div>
  );
}
