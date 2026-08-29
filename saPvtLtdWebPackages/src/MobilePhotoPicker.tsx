import {
  useId,
  useRef,
  type ChangeEvent,
  type CSSProperties,
  type RefObject,
} from 'react';
import {Icon} from './Icon.js';

export interface MobilePhotoPickerProps {
  /** Called when the user picks one or more files. */
  onChange: (files: File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  /** MIME list for gallery / files picker (no capture). */
  acceptGallery?: string;
  cameraLabel?: string;
  galleryLabel?: string;
  className?: string;
  style?: CSSProperties;
  layout?: 'inline' | 'stack';
  testId?: string;
  /** Optional ref to the gallery input (e.g. programmatic retry). */
  galleryInputRef?: RefObject<HTMLInputElement | null>;
}

/** Gallery: include HEIC + image/* so iPhone and desktop picks always bind. */
const DEFAULT_GALLERY_ACCEPT =
  'image/jpeg,image/png,image/webp,image/heic,image/heif,image/*,.heic,.heif';

function filesFromInput(input: HTMLInputElement): File[] {
  if (!input.files?.length) return [];
  return Array.from(input.files);
}

function resetInputLater(input: HTMLInputElement) {
  window.setTimeout(() => {
    input.value = '';
  }, 0);
}

/**
 * Mobile-friendly photo source control — separate camera vs gallery intents.
 * Uses native <label htmlFor> (not programmatic .click()) for reliable iOS/Safari.
 */
export function MobilePhotoPicker({
  onChange,
  multiple = false,
  disabled = false,
  acceptGallery = DEFAULT_GALLERY_ACCEPT,
  cameraLabel = 'Take photo',
  galleryLabel = 'Choose from gallery',
  className = '',
  style,
  layout = 'inline',
  testId = 'hs-mobile-photo-picker',
  galleryInputRef,
}: MobilePhotoPickerProps) {
  const uid = useId();
  const cameraId = `${uid}-camera`;
  const galleryId = `${uid}-gallery`;
  const cameraRef = useRef<HTMLInputElement>(null);
  const internalGalleryRef = useRef<HTMLInputElement>(null);
  const lastEmitRef = useRef('');

  const setGalleryRef = (node: HTMLInputElement | null) => {
    internalGalleryRef.current = node;
    if (galleryInputRef) {
      galleryInputRef.current = node;
    }
  };

  const emit = (files: File[]) => {
    if (!files.length) return;
    const key = files
      .map((f) => `${f.name}:${f.size}:${f.lastModified}`)
      .join('|');
    if (key === lastEmitRef.current) return;
    lastEmitRef.current = key;
    onChange(files);
    window.setTimeout(() => {
      lastEmitRef.current = '';
    }, 300);
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const files = filesFromInput(input);
    resetInputLater(input);
    emit(files);
  };

  const layoutClass =
    layout === 'stack'
      ? 'hs-mobile-photo-picker--stack'
      : 'hs-mobile-photo-picker--inline';

  const btnClass = (extra: string) =>
    `hs-btn hs-btn--secondary hs-btn--sm hs-mobile-photo-picker__btn ${extra}`.trim();

  return (
    <div
      className={`hs-mobile-photo-picker ${layoutClass} ${className}`.trim()}
      style={style}
      data-testid={testId}>
      <label
        htmlFor={disabled ? undefined : cameraId}
        className={`hs-mobile-photo-picker__label${disabled ? ' is-disabled' : ''}`}
        data-testid={`${testId}-camera`}>
        <span className={btnClass('hs-mobile-photo-picker__btn--camera')}>
          <span className="hs-btn__label">
            <Icon name="photo_camera" size={16} />
            {cameraLabel}
          </span>
        </span>
      </label>
      <label
        htmlFor={disabled ? undefined : galleryId}
        className={`hs-mobile-photo-picker__label${disabled ? ' is-disabled' : ''}`}
        data-testid={`${testId}-gallery`}>
        <span className={btnClass('hs-mobile-photo-picker__btn--gallery')}>
          <span className="hs-btn__label">
            <Icon name="photo_library" size={16} />
            {galleryLabel}
          </span>
        </span>
      </label>
      <input
        id={cameraId}
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple={multiple}
        className="hs-mobile-photo-picker__input"
        disabled={disabled}
        tabIndex={-1}
        aria-hidden
        onChange={onPick}
      />
      <input
        id={galleryId}
        ref={setGalleryRef}
        type="file"
        accept={acceptGallery}
        multiple={multiple}
        className="hs-mobile-photo-picker__input"
        disabled={disabled}
        tabIndex={-1}
        aria-hidden
        onChange={onPick}
      />
    </div>
  );
}
