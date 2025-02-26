import { Social, State, Widget, context, props, state } from "alem";
import Image from "./Image";
import OverlayTrigger from "./OverlayTrigger";

type Props = {
  profile?: any;
  accountId?: string;
  style?: React.CSSProperties;
  imageClassName?: string;
  image?: string;
  title?: string;
  name?: string;
  className?: string;
  imageStyle?: React.CSSProperties;
  imageWrapperStyle?: React.CSSProperties;
  thumbnail?: boolean;
  tooltip?: boolean;
  fast?: boolean;
  fallbackUrl?: string;
};

const ProfileImage = (profileImgProps: Props) => {
  // * taken from mob.near/widget/ProfileImage with minor tweaks for expanded composability *
  const {
    profile: _profile,
    accountId: _accountId,
    style: _style,
    imageClassName: _imageClassName,
    image: _image,
    title: _title,
    name: _name,
    className: _className,
    imageStyle: _imageStyle,
    imageWrapperStyle: _imageWrapperStyle,
    thumbnail: _thumbnail,
    tooltip: _tooltip,
    fast: _fast,
  } = profileImgProps;

  const accountId = _accountId ?? context.accountId;
  const className = _className ?? "profile-image d-inline-block";
  const style = _style ?? { width: "3em", height: "3em" };
  const imageStyle = _imageStyle ?? { objectFit: "cover" };
  const imageWrapperStyle = _imageWrapperStyle ?? { width: "100%", height: "100%" };
  const imageClassName = _imageClassName ?? "rounded-circle w-100 h-100";
  const thumbnail = _thumbnail ?? "thumbnail";

  const profile = _profile ?? Social.getr(`${accountId}/profile`);

  const name = _name || "No-name profile";
  const image = _image || profile.image;
  const title = _title ?? `${name} @${accountId}`;
  const tooltip = _tooltip && (_tooltip === true ? title : _tooltip);
  const fast = _fast || (!_profile && !!accountId);
  if (accountId !== state.accountId) {
    State.update({
      fastImageUrl: `https://i.near.social/magic/${
        thumbnail || "large"
      }/https://near.social/magic/img/account/${accountId}`,
      accountId,
    });
  }
  const fallbackUrl = props.fallbackUrl;

  const imageProps = {
    image,
    alt: title,
    className: imageClassName,
    style: imageStyle,
    thumbnail,
    fallbackUrl,
  };

  const inner = fast ? (
    <div className={className} style={style} key={state.fastImageUrl}>
      <img
        className={imageClassName}
        style={imageStyle}
        src={state.fastImageUrl}
        alt={title}
        onError={() => {
          if (state.fastImageUrl !== fallbackUrl) {
            State.update({
              fastImageUrl: fallbackUrl,
            });
          }
        }}
      />
    </div>
  ) : (
    <div className={className} style={style} key={JSON.stringify(image)}>
      <Image {...imageProps} />
    </div>
  );

  return props.tooltip ? <OverlayTrigger accountId={accountId}>{inner}</OverlayTrigger> : inner;
};

export default ProfileImage;
