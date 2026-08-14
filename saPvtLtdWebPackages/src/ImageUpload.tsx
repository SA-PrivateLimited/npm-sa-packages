import type {CSSProperties, ChangeEvent} from 'react';
import {Icon} from './Icon.js';

export interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  accept?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

function readFiles(files: FileList | null): Promise<string[]> {
  if (!files?.length) return Promise.resolve([]);
  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        }),
    ),
  );
}

export function ImageUpload({
  value,
  onChange,
  max = 5,
  accept = 'image/*',
  disabled = false,
  label = 'Upload images',
  className = '',
  style,
  testId = 'hs-image-upload',
}: ImageUploadProps) {
  const remaining = Math.max(0, max - value.length);

  const onPick = async (e: ChangeEvent<HTMLInputElement>) => {
    const urls = await readFiles(e.target.files);
    e.target.value = '';
    if (!urls.length) return;
    onChange([...value, ...urls].slice(0, max));
  };

  return (
    <div
      className={`hs-image-upload ${className}`.trim()}
      style={style}
      data-testid={testId}>
      {label ? <p className="hs-field-label">{label}</p> : null}
      <div className="hs-image-upload__grid">
        {value.map((src, i) => (
          <div key={`${i}-${src.slice(0, 24)}`} className="hs-image-upload__thumb">
            <img src={src} alt="" />
            {!disabled ? (
              <button
                type="button"
                className="hs-image-upload__remove"
                aria-label="Remove image"
                onClick={() => onChange(value.filter((_, idx) => idx !== i))}>
                <Icon name="close" size={14} />
              </button>
            ) : null}
          </div>
        ))}
        {remaining > 0 && !disabled ? (
          <label className="hs-image-upload__add">
            <Icon name="add" size={28} />
            <span>
              Add ({value.length}/{max})
            </span>
            <input
              type="file"
              accept={accept}
              multiple={remaining > 1}
              hidden
              onChange={(e) => void onPick(e)}
            />
          </label>
        ) : null}
      </div>
    </div>
  );
}
