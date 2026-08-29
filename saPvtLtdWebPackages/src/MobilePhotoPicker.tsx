import {useRef, type ChangeEvent, type CSSProperties, type RefObject} from 'react';
import {Button} from './Button.js';
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

const DEFAULT_GALLERY_ACCEPT = 'image/jpeg,image/png,image/webp';

function filesFromEvent(e: ChangeEvent<HTMLInputElement>): File[] {
  const list = e.target.files;
  e.target.value = '';
  if (!list?.length) return [];
  return Array.from(list);
}

/**
 * Mobile-friendly photo source control — separate camera vs gallery intents.
 * Android Chrome often hides camera when a single file input uses MIME types without capture.
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
  const cameraRef = useRef<HTMLInputElement>(null);
  const internalGalleryRef = useRef<HTMLInputElement>(null);
  const galleryRef = galleryInputRef ?? internalGalleryRef;

  const emit = (files: File[]) => {
    if (files.length) onChange(files);
  };

  const layoutClass =
    layout === 'stack'
      ? 'hs-mobile-photo-picker--stack'
      : 'hs-mobile-photo-picker--inline';

  return (
    <div
      className={`hs-mobile-photo-picker ${layoutClass} ${className}`.trim()}
      style={style}
      data-testid={testId}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={disabled}
        className="hs-mobile-photo-picker__btn"
        testId={`${testId}-camera`}
        onClick={() => cameraRef.current?.click()}>
        <Icon name="photo_camera" size={16} />
        {cameraLabel}
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={disabled}
        className="hs-mobile-photo-picker__btn"
        testId={`${testId}-gallery`}
        onClick={() => galleryRef.current?.click()}>
        <Icon name="photo_library" size={16} />
        {galleryLabel}
      </Button>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple={multiple}
        hidden
        disabled={disabled}
        onChange={(e) => emit(filesFromEvent(e))}
      />
      <input
        ref={galleryRef}
        type="file"
        accept={acceptGallery}
        multiple={multiple}
        hidden
        disabled={disabled}
        onChange={(e) => emit(filesFromEvent(e))}
      />
    </div>
  );
}
