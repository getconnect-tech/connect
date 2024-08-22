/* eslint-disable max-len */
import { colors } from '@/styles/colors';

const getViewBox = (name: string) => {
  switch (name) {
    default:
      return '0 0 24 24';
  }
};

const getPath = (name: string, props: any) => {
  const {
    fill,
    // , stroke, stopColor, iconprimary
  } = props;
  switch (name) {
    case 'logo-icon':
      return (
        <>
          <rect width={20} height={20} fill='#0D0D0F' rx={10} />
          <path
            fill='#fff'
            d='M12.816 13.962c.337-.352.56-.705.8-1.105.273-.432.417-.576.689-.576.464 0 .576.32.576.896v.112c-.032 1.04-.224 1.521-.704 1.873-.592.432-1.84.736-3.121.736-3.858 0-5.939-2.913-5.939-5.842 0-2.977 2.145-5.954 6.195-5.954 1.136 0 2.16.24 2.705.576.672.416.672.784.672 1.552v.16c0 .8-.112 1.089-.544 1.089-.368 0-.48-.16-.672-.48-.208-.336-.465-.865-1.073-1.313a2.519 2.519 0 0 0-1.504-.48c-1.985 0-3.426 1.953-3.426 4.626 0 .176 0 .352.016.528.208 2.977 1.873 4.354 3.538 4.354.72 0 1.328-.272 1.792-.752Z'
          />
        </>
      );
    case 'sidebar-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M13 1H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3ZM2 4a1 1 0 0 1 1-1h2v10H3a1 1 0 0 1-1-1V4Zm5 9h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H7v10Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'started-icon':
      return (
        <>
          <path
            fill={fill}
            d='M10.416 4.589 8.66 6.345a.924.924 0 0 1-.653.27H1.886C1.128 6.615.75 6.237.75 5.48V2.83c0-.758.378-1.137 1.136-1.137h2.71V.462c0-.253.21-.462.462-.462s.461.21.461.462v1.23h2.488c.245 0 .48.098.653.27l1.756 1.757c.241.24.241.63 0 .87Zm-3.512 6.488H5.52V7.538h-.923v3.539H3.212a.462.462 0 0 0 0 .923h3.692a.462.462 0 0 0 0-.923Z'
          />
        </>
      );
    case 'inbox-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M10 0H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm0 7H8.5a.5.5 0 0 0-.5.5V9H4V7.5a.5.5 0 0 0-.5-.5H2V2h8v5Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'unassign-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.005 3a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM6 11.1a5.074 5.074 0 0 1-3.444-1.344c.264-.828.948-1.614 2.418-1.614h2.052c1.464 0 2.148.792 2.418 1.614A5.074 5.074 0 0 1 6 11.1Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'all-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M10.358 4.323c-.174.545-.62.988-1.166 1.159a1.852 1.852 0 0 1-2.146-.77.17.17 0 0 1 0-.174c.248-.443.389-.955.389-1.502 0-.19-.017-.375-.05-.556a.17.17 0 0 1 .054-.16 1.8 1.8 0 0 1 1.167-.427 1.848 1.848 0 0 1 1.752 2.43Zm-.867 2.016H8.36a.168.168 0 0 0-.171.171c0 .046.017.091.051.12l.017.017c.8.772 1.172 1.874 1.172 2.972 0 .211-.012.417-.046.605a.298.298 0 0 0-.008.07c0 .097.076.17.168.17h.834c1.046 0 1.623-.571 1.623-1.611 0-1.16-.657-2.514-2.509-2.514ZM4.291.75a2.285 2.285 0 1 0 0 4.57 2.285 2.285 0 0 0 0-4.57ZM5.43 6.464H3.143C.823 6.464 0 8.161 0 9.62c0 1.302.691 1.988 2 1.988h4.571c1.309 0 2-.686 2-1.988 0-1.458-.822-3.155-3.142-3.155Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'contact-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              fillRule='evenodd'
              d='M9.368 12H2.631a1.666 1.666 0 0 1-1.64-1.368L.022 5.31a1.333 1.333 0 0 1 .465-1.268L4.941.38a1.667 1.667 0 0 1 2.118 0l4.455 3.662c.374.307.551.792.464 1.268l-.97 5.322A1.667 1.667 0 0 1 9.368 12ZM6 6.533a1.435 1.435 0 0 0 0-2.867 1.435 1.435 0 0 0 0 2.867ZM8.333 9.13v.202c0 .184-.15.333-.333.333H4a.333.333 0 0 1-.334-.333V9.13c0-.893.654-1.798 1.906-1.798h.855c1.252 0 1.906.904 1.906 1.798Z'
              clipRule='evenodd'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'insight-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M11.802 5.234a.812.812 0 0 1-.613.28H7.292a.806.806 0 0 1-.805-.806V.81a.811.811 0 0 1 .916-.803 5.41 5.41 0 0 1 4.59 4.59.801.801 0 0 1-.191.636ZM10.528 7.04a.783.783 0 0 0-.608-.29H6.06a.812.812 0 0 1-.81-.81V2.08a.784.784 0 0 0-.29-.61.761.761 0 0 0-.63-.158A5.436 5.436 0 0 0 .89 3.636 5.422 5.422 0 0 0 .12 7.76c.424 2.04 2.08 3.695 4.12 4.12.385.08.771.12 1.153.12a5.366 5.366 0 0 0 2.97-.889 5.438 5.438 0 0 0 2.324-3.44.749.749 0 0 0-.159-.63Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'bug-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M12 11.21a.462.462 0 0 1-.924 0c0-.763-.621-1.384-1.384-1.384h-.423A3.687 3.687 0 0 1 6.68 11.76a.189.189 0 0 1-.218-.186v-4.67A.465.465 0 0 0 6 6.441a.465.465 0 0 0-.461.461v4.671a.189.189 0 0 1-.219.186 3.687 3.687 0 0 1-2.588-1.934h-.424c-.763 0-1.385.621-1.385 1.385a.462.462 0 0 1-.923 0 2.31 2.31 0 0 1 2.308-2.308h.088a3.683 3.683 0 0 1-.088-.769v-.769H.462a.462.462 0 0 1 0-.923h1.846V5.057c0-.056.008-.104.01-.158A2.29 2.29 0 0 1 .22 3.323l-.196-.58A.462.462 0 0 1 .9 2.448l.197.584c.182.56.699.938 1.287.948l.162.002c.281-.512.816-.771 1.609-.771h3.692c.793 0 1.327.26 1.609.77l.162-.001a1.371 1.371 0 0 0 1.285-.942l.198-.59a.462.462 0 0 1 .875.295l-.196.585a2.29 2.29 0 0 1-2.097 1.57c.002.055.01.103.01.16v1.384h1.847a.462.462 0 0 1 0 .923H9.692v.77c0 .264-.035.52-.088.768h.088a2.31 2.31 0 0 1 2.307 2.308ZM4.42 2.289h3.16c.12 0 .216-.114.18-.229A1.84 1.84 0 0 0 6 .75a1.84 1.84 0 0 0-1.761 1.31c-.035.114.061.228.18.228Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'question-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.012 9.3a.603.603 0 0 1-.603-.6c0-.331.266-.6.597-.6h.006a.6.6 0 1 1 0 1.2Zm.95-2.983c-.439.294-.52.458-.535.5a.45.45 0 1 1-.854-.286c.109-.324.39-.63.887-.962.613-.41.534-.86.508-1.008a1 1 0 0 0-.786-.795.97.97 0 0 0-.81.212 1 1 0 0 0-.357.768.45.45 0 0 1-.9 0c0-.565.248-1.096.679-1.457.427-.358.99-.507 1.544-.409.76.134 1.384.763 1.517 1.527.132.757-.186 1.436-.893 1.91Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'feedback-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0ZM4.2 8.37c0 .1-.08.18-.18.18h-.396a.474.474 0 0 1-.474-.474v-2.22c0-.261.213-.474.474-.474h.396c.1 0 .18.08.18.18V8.37ZM8.771 6l-.636 1.902c-.126.384-.264.648-.9.648H4.98a.18.18 0 0 1-.18-.18V5.213c0-.02.003-.038.01-.057l.65-1.982a.504.504 0 0 1 .75-.24c.264.174.42.474.42.792v1.026h1.242c.948 0 1.104.636.9 1.248Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'support-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M3.828 4.458c-.012-.006-.018-.018-.03-.024l-2.34-2.346A5.942 5.942 0 0 0 0 6c0 1.494.546 2.862 1.458 3.912l2.34-2.346c.006-.012.018-.018.03-.024A2.68 2.68 0 0 1 3.336 6c0-.57.186-1.11.492-1.542ZM6 0a5.952 5.952 0 0 0-3.906 1.452l2.34 2.346c.012.012.018.024.024.036A2.629 2.629 0 0 1 6 3.336a2.7 2.7 0 0 1 1.548.492.105.105 0 0 1 .024-.03l2.34-2.346A5.944 5.944 0 0 0 6 0Zm4.548 2.088-2.34 2.346c-.012.006-.018.018-.03.024.306.432.492.972.492 1.542 0 .57-.186 1.11-.492 1.542a.105.105 0 0 1 .03.024l2.34 2.346A5.968 5.968 0 0 0 12 6a5.968 5.968 0 0 0-1.452-3.912Zm-3 6.084A2.7 2.7 0 0 1 6 8.664c-.576 0-1.11-.186-1.542-.498-.006.012-.012.024-.024.036l-2.34 2.346A5.952 5.952 0 0 0 6 12c1.5 0 2.868-.546 3.912-1.452l-2.34-2.346a.105.105 0 0 1-.024-.03Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'up-arrow-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M9.746 8.636 5.989 5.1 2.233 8.636a.905.905 0 0 1-.616.231.903.903 0 0 1-.61-.241.8.8 0 0 1-.257-.575.798.798 0 0 1 .246-.58L5.37 3.354a.904.904 0 0 1 .62-.241c.231 0 .454.086.618.24l4.375 4.118c.083.076.15.167.196.268a.781.781 0 0 1-.185.907.88.88 0 0 1-.288.18.923.923 0 0 1-.96-.19Z'
          />
        </>
      );
    case 'down-arrow-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M9.746 3.364 5.989 6.9 2.233 3.364a.905.905 0 0 0-.616-.231.903.903 0 0 0-.61.241.8.8 0 0 0-.257.575.798.798 0 0 0 .246.58L5.37 8.646a.904.904 0 0 0 .618.241.904.904 0 0 0 .619-.24l4.375-4.118a.824.824 0 0 0 .196-.268.783.783 0 0 0-.185-.907.88.88 0 0 0-.288-.18.923.923 0 0 0-.96.19Z'
          />
        </>
      );
    case 'three-dot-icon':
      return (
        <>
          <path
            fill={fill}
            d='M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM14 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'
          />
        </>
      );
    case 'back-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.514 12.994 6.801 7.986l4.713-5.009c.2-.22.311-.515.309-.82a1.204 1.204 0 0 0-.322-.815A1.067 1.067 0 0 0 10.734 1a1.065 1.065 0 0 0-.772.327l-5.49 5.834a1.205 1.205 0 0 0-.322.825c0 .309.116.606.322.824l5.49 5.834c.101.111.222.2.356.261a1.044 1.044 0 0 0 1.21-.247c.103-.11.185-.24.24-.383a1.23 1.23 0 0 0-.008-.902 1.17 1.17 0 0 0-.246-.379Z'
          />
        </>
      );
    case 'attach-icon':
      return (
        <>
          <path
            d='M4.98778 12.0001C3.80098 12.0001 2.69638 11.5471 1.87558 10.7239C0.145776 8.98934 0.171691 6.14115 1.93329 4.37415L5.37011 0.92774C5.96711 0.32894 6.76022 -0.000457764 7.60502 -0.000457764C8.44982 -0.000457764 9.24248 0.32894 9.84008 0.92774C11.0713 2.16254 11.0713 4.17074 9.84008 5.40494L6.38642 8.86754C5.67602 9.57914 4.4371 9.58034 3.7267 8.86754C2.9947 8.13314 2.9947 6.93915 3.7267 6.20535L6.76024 3.16335C6.99484 2.92875 7.37408 2.92814 7.60868 3.16214C7.84388 3.39614 7.84385 3.77594 7.60985 4.01054L4.57631 7.05254C4.31051 7.31954 4.31051 7.75335 4.57631 8.02035C4.83371 8.27775 5.28001 8.27715 5.53681 8.02035L8.99047 4.55775C9.75547 3.79035 9.75547 2.54235 8.99047 1.77495C8.25007 1.03275 6.9607 1.03275 6.2203 1.77495L2.78349 5.22134C1.50969 6.49874 1.48377 8.63054 2.72577 9.87614C3.31917 10.4713 4.12317 10.7995 4.98837 10.7995C5.87637 10.7995 6.74291 10.4425 7.36391 9.81914L10.38 6.79394C10.6146 6.55934 10.9939 6.55875 11.2285 6.79275C11.4637 7.02675 11.4636 7.40654 11.2296 7.64114L8.21337 10.6664C7.36737 11.5142 6.19198 12.0001 4.98778 12.0001Z'
            fill={fill}
          />
        </>
      );
    case 'send-icon':
      return (
        <>
          <path
            fill={fill}
            d='M2.707 5.707 5 3.414V11a1 1 0 1 0 2 0V3.414l2.293 2.293a1 1 0 0 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 1.414 1.414Z'
          />
        </>
      );
    case 'dot-icon':
      return (
        <>
          <path
            d='M0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2Z'
            fill='#7B7A79'
          />
        </>
      );
    case 'priority-URGENT':
      return (
        <>
          <path
            fill='#313130'
            d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm-.45 3.3a.45.45 0 0 1 .9 0v2.743a.45.45 0 0 1-.9 0V3.3Zm.462 5.4a.603.603 0 0 1-.603-.6c0-.331.266-.6.597-.6h.006a.6.6 0 1 1 0 1.2Z'
          />
        </>
      );
    case 'priority-HIGH':
      return (
        <>
          <path
            fill='#313130'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1ZM6.462 3h-.923c-.51 0-.924.448-.924 1v7c0 .552.414 1 .924 1h.923c.51 0 .923-.448.923-1V4c0-.552-.414-1-.923-1ZM11.077 0h-.923c-.51 0-.923.448-.923 1v10c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V1c0-.552-.413-1-.923-1Z'
          />
        </>
      );
    case 'priority-MEDIUM':
      return (
        <>
          <path
            fill='#313130'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1ZM6.461 3h-.923c-.51 0-.923.448-.923 1v7c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V4c0-.552-.413-1-.923-1Z'
          />
          <path
            fill='#C4C3C1'
            d='M11.077 0h-.923c-.51 0-.923.448-.923 1v10c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V1c0-.552-.413-1-.923-1Z'
          />
        </>
      );
    case 'priority-LOW':
      return (
        <>
          <path
            fill='#313130'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.414 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1Z'
          />
          <path
            fill='#C4C3C1'
            d='M6.461 3h-.923c-.51 0-.923.448-.923 1v7c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V4c0-.552-.413-1-.923-1ZM11.077 0h-.923c-.51 0-.923.448-.923 1v10c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V1c0-.552-.413-1-.923-1Z'
          />
        </>
      );
    case 'priority-NONE':
      return (
        <>
          <path
            fill='#C4C3C1'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1ZM6.462 3h-.923c-.51 0-.923.448-.923 1v7c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V4c0-.552-.413-1-.923-1ZM11.077 0h-.924c-.51 0-.923.448-.923 1v10c0 .552.414 1 .923 1h.924c.51 0 .923-.448.923-1V1c0-.552-.414-1-.923-1Z'
          />
        </>
      );
    case 'error-icon':
      return (
        <>
          <path
            fill='#BC5749'
            d='M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Zm-.525 3.85a.525.525 0 0 1 1.05 0v3.2a.525.525 0 0 1-1.05 0v-3.2Zm.539 6.3a.703.703 0 0 1-.704-.7c0-.386.31-.7.697-.7h.007a.7.7 0 1 1 0 1.4Z'
          />
        </>
      );
    case 'google-icon':
      return (
        <>
          <path
            fill='#4280EF'
            d='M15.1 8.086c0-.49-.048-.996-.127-1.47H8.13v2.798h3.92a3.298 3.298 0 0 1-1.454 2.197l2.34 1.817c1.374-1.28 2.165-3.145 2.165-5.342Z'
          />
          <path
            fill='#34A353'
            d='M8.13 15.167c1.96 0 3.603-.648 4.804-1.754l-2.339-1.802c-.648.442-1.486.695-2.466.695-1.897 0-3.493-1.28-4.078-2.987l-2.403 1.85c1.233 2.45 3.73 3.998 6.481 3.998Z'
          />
          <path
            fill='#F6B704'
            d='M4.051 9.303c-.3-.901-.3-1.881 0-2.782L1.65 4.656a7.265 7.265 0 0 0 0 6.512L4.05 9.303Z'
          />
          <path
            fill='#E54335'
            d='M8.13 3.533a3.959 3.959 0 0 1 2.781 1.091l2.071-2.086A6.983 6.983 0 0 0 8.129.657a7.248 7.248 0 0 0-6.48 3.999L4.05 6.52c.585-1.723 2.181-2.988 4.078-2.988Z'
          />
        </>
      );
    case 'cross-icon':
      return (
        <>
          <mask
            id='a'
            width={16}
            height={16}
            x={0}
            y={0}
            maskUnits='userSpaceOnUse'
            style={{
              maskType: 'luminance',
            }}
          >
            <path fill='#fff' d='M16 0H0v16h16V0Z' />
          </mask>
          <g mask='url(#a)'>
            <path
              fill={fill}
              d='m9.617 8 6.049-6.049A1.141 1.141 0 1 0 14.05.335L8 6.386 1.952.335A1.142 1.142 0 1 0 .336 1.952l6.049 6.05-6.049 6.048a1.141 1.141 0 1 0 1.616 1.616l6.049-6.049 6.049 6.05a1.14 1.14 0 0 0 1.616 0 1.141 1.141 0 0 0 0-1.617L9.616 8Z'
            />
          </g>
        </>
      );
    case 'plus-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill='#282828'
              d='M11 5H7V1a1 1 0 0 0-2 0v4H1a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0V7h4a1 1 0 1 0 0-2Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'dropdown-unassign-icon':
      return (
        <>
          <path
            fill='#fff'
            d='M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Z'
          />
          <path
            fill='#C4C3C1'
            d='M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm.008 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM10 18.5c-2.21 0-4.23-.85-5.74-2.24.44-1.38 1.58-2.69 4.03-2.69h3.42c2.44 0 3.58 1.32 4.03 2.69A8.456 8.456 0 0 1 10 18.5Z'
          />
        </>
      );
    case 'search-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M11.718 11.152 9.413 8.848A5.223 5.223 0 0 0 10.65 5.47 5.256 5.256 0 0 0 5.4.22 5.256 5.256 0 0 0 .15 5.47a5.256 5.256 0 0 0 5.25 5.25 5.223 5.223 0 0 0 3.377-1.236l2.305 2.304a.449.449 0 1 0 .636-.636ZM1.05 5.47A4.355 4.355 0 0 1 5.4 1.12a4.355 4.355 0 0 1 4.35 4.35A4.355 4.355 0 0 1 5.4 9.82a4.355 4.355 0 0 1-4.35-4.35Z'
          />
        </>
      );
    case 'context-arrow-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill='#C4C3C1'
              d='m2.804 8.192 2.946-3.13L2.804 1.93a.754.754 0 0 1-.193-.513.753.753 0 0 1 .2-.51.667.667 0 0 1 .48-.213.665.665 0 0 1 .483.205l3.431 3.646c.129.136.201.322.201.515a.753.753 0 0 1-.2.516L3.773 9.223a.687.687 0 0 1-.223.163.652.652 0 0 1-.756-.154.77.77 0 0 1 .009-1.04Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 .07h10v10H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'context-assign-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 .07a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm.005 3a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM6 11.17a5.074 5.074 0 0 1-3.444-1.344c.264-.828.948-1.614 2.418-1.614h2.052c1.464 0 2.148.792 2.418 1.614A5.074 5.074 0 0 1 6 11.17Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 .07h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'context-snooze-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M6 .07a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm2.118 8.118a.449.449 0 0 1-.636 0l-1.8-1.8a.45.45 0 0 1-.132-.318v-3a.45.45 0 0 1 .9 0v2.814l1.668 1.668a.45.45 0 0 1 0 .636Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'context-label-icon':
      return (
        <>
          <path
            fill={fill}
            d='m11.307 8.21-3.174 3.18c-.913.907-1.853.907-2.76 0l-.536-.542a.2.2 0 0 1 0-.283l5.651-5.65a.2.2 0 0 1 .283 0l.535.535c.94.94.907 1.847 0 2.76ZM9.799 4.225l-5.651 5.65a.2.2 0 0 1-.283 0L.573 6.585A1.956 1.956 0 0 1 0 5.199V1.37A1.3 1.3 0 0 1 1.3.07h3.825a1.95 1.95 0 0 1 1.382.574l3.292 3.298a.2.2 0 0 1 0 .283ZM3.333 2.737a.666.666 0 0 0-.665-.667h-.007A.664.664 0 0 0 2 2.737a.666.666 0 1 0 1.334 0Z'
          />
        </>
      );
    case 'setting-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.887 7.733a2.004 2.004 0 0 1 0-3.466c.106-.067.146-.2.08-.307l-1.114-1.92a.213.213 0 0 0-.186-.113c-.04 0-.08.013-.114.033a2.041 2.041 0 0 1-1 .267c-.353 0-.7-.094-1.013-.274-.62-.36-1-1.013-1-1.726C7.54.1 7.44 0 7.32 0H4.68c-.12 0-.22.1-.22.227 0 .713-.38 1.366-1 1.726-.313.18-.66.274-1.013.274-.347 0-.694-.094-1-.267a.213.213 0 0 0-.3.08L.027 3.96A.211.211 0 0 0 0 4.067c0 .08.04.153.113.2.62.36 1 1.013 1 1.726 0 .72-.38 1.38-.993 1.74H.113c-.106.067-.146.2-.08.307l1.114 1.92c.04.073.113.113.186.113.04 0 .08-.013.114-.033a2.028 2.028 0 0 1 2.013.007c.613.36.993 1.013.993 1.726 0 .127.1.227.227.227h2.64c.12 0 .22-.1.22-.227 0-.713.38-1.366 1-1.726.313-.18.66-.274 1.013-.274.347 0 .694.094 1 .267.107.067.24.027.3-.08l1.12-1.92A.211.211 0 0 0 12 7.933c0-.08-.04-.153-.113-.2ZM6 8c-1.107 0-2-.893-2-2s.893-2 2-2 2 .893 2 2-.893 2-2 2Z'
          />
        </>
      );
    case 'logout-icon':
      return (
        <>
          <path
            fill={fill}
            d='M3.158 6.474h4.42V9.789c0 1.264-.63 1.895-1.894 1.895h-3.79C.633 11.684 0 11.053 0 9.79V2.21C0 .947.632.316 1.895.316h3.79c1.262 0 1.894.631 1.894 1.894V5.526H3.158a.474.474 0 0 0 0 .948Zm8.648-.655a.473.473 0 0 0-.103-.154L9.808 3.77a.474.474 0 1 0-.67.67l1.087 1.086H7.579v.948h2.646L9.138 7.56a.474.474 0 0 0 .67.67l1.895-1.895a.473.473 0 0 0 .103-.516Z'
          />
        </>
      );
    case 'workspaceProfile-icon':
      return (
        <>
          <path
            fill='#C4C3C1'
            d='M29 0C12.983 0 0 12.983 0 29s12.983 29 29 29 29-12.983 29-29S45.017 0 29 0Zm.023 14.5a8.7 8.7 0 0 1 8.7 8.7 8.7 8.7 0 0 1-8.7 8.7 8.7 8.7 0 0 1-8.7-8.7 8.7 8.7 0 0 1 8.7-8.7ZM29 53.65a24.522 24.522 0 0 1-16.646-6.496c1.276-4.002 4.582-7.801 11.687-7.801h9.918c7.076 0 10.382 3.828 11.687 7.801A24.522 24.522 0 0 1 29 53.65Z'
          />
        </>
      );
    case 'email-icon':
      return (
        <>
          <path
            fill={fill}
            d='M10 1H2C.667 1 0 1.667 0 3v6c0 1.333.667 2 2 2h8c1.333 0 2-.667 2-2V3c0-1.333-.667-2-2-2Zm-.04 3.07L6.687 6.453a1.165 1.165 0 0 1-1.372 0L2.039 4.072a.5.5 0 1 1 .589-.809l3.275 2.381a.166.166 0 0 0 .195 0l3.275-2.381a.5.5 0 1 1 .588.809Z'
          />
        </>
      );
    case 'internal-icon':
      return (
        <>
          <path
            fill={fill}
            d='M6 .334c-3.313 0-6 2-6 5.334C0 7.08.487 8.262 1.3 9.142c-.1.64-.46 1.373-1.187 1.96-.22.186-.093.553.194.56.946.033 2.406-.094 3.3-1.047.733.253 1.54.387 2.393.387 3.313 0 6-2.001 6-5.334C12 2.334 9.313.334 6 .334ZM6.667 7.5H3.333a.5.5 0 0 1 0-1h3.334a.5.5 0 0 1 0 1Zm2-2.666H3.333a.5.5 0 0 1 0-1h5.334a.5.5 0 0 1 0 1Z'
          />
        </>
      );
    case 'close-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12ZM5 6.793l3.147-3.147a.5.5 0 0 1 .707.707l-3.5 3.5a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.707L5 6.793Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'admin-icon':
      return (
        <>
          <path
            fill={fill}
            d='M3.605 2.7c0-1.324 1.077-2.4 2.4-2.4 1.324 0 2.4 1.076 2.4 2.4 0 1.324-1.076 2.4-2.4 2.4a2.402 2.402 0 0 1-2.4-2.4ZM7.2 6.3H4.8c-2.436 0-3.3 1.784-3.3 3.311 0 1.367.727 2.089 2.102 2.089h4.796c1.375 0 2.102-.722 2.102-2.089 0-1.527-.864-3.311-3.3-3.311Z'
          />
        </>
      );
    case 'delete-icon':
      return (
        <>
          <path
            fill='#BC5749'
            d='M11.833 2a.5.5 0 0 1-.5.5H.667a.5.5 0 0 1 0-1h2.809c.062-.121.11-.259.161-.412l.135-.405A1 1 0 0 1 4.721 0h2.558a1 1 0 0 1 .949.683l.135.405c.051.153.099.29.161.412h2.81a.5.5 0 0 1 .5.5Zm-1.46 1.167a.2.2 0 0 1 .2.213l-.446 6.753C10.053 11.187 9.5 12 8.127 12H3.873c-1.373 0-1.926-.813-2-1.867L1.427 3.38a.2.2 0 0 1 .2-.213h8.746ZM5.167 5.333c0-.273-.227-.5-.5-.5-.274 0-.5.227-.5.5v3.334c0 .273.226.5.5.5.273 0 .5-.227.5-.5V5.333Zm2.666 0c0-.273-.226-.5-.5-.5-.273 0-.5.227-.5.5v3.334c0 .273.227.5.5.5.274 0 .5-.227.5-.5V5.333Z'
          />
        </>
      );
    case 'copy-icon':
      return (
        <>
          <g fill='#7B7A79' clipPath='url(#a)'>
            <path d='M12 1.833A1.334 1.334 0 0 0 10.667.5H1.333A1.333 1.333 0 0 0 0 1.833V12.5a1.333 1.333 0 0 0 1.333 1.333H6V6.5a1.333 1.333 0 0 1 1.333-1.333H12V1.833Z' />
            <path d='M15.333 7.167H8.667A.667.667 0 0 0 8 7.833v8c0 .368.298.667.667.667h6.666a.667.667 0 0 0 .667-.667v-8a.667.667 0 0 0-.667-.666Z' />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 .5h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'ai-icon':
      return (
        <>
          <g fill='#fff' clipPath='url(#a)'>
            <path d='M9.75 4.5a.562.562 0 0 1-.563-.563 1.125 1.125 0 0 0-1.124-1.124.562.562 0 1 1 0-1.126A1.125 1.125 0 0 0 9.187.563a.562.562 0 1 1 1.126 0 1.125 1.125 0 0 0 1.124 1.125.562.562 0 1 1 0 1.125 1.125 1.125 0 0 0-1.124 1.126.562.562 0 0 1-.563.562ZM4.5 12a.75.75 0 0 1-.75-.75 3 3 0 0 0-3-3 .75.75 0 0 1 0-1.5 3 3 0 0 0 3-3 .75.75 0 1 1 1.5 0 3 3 0 0 0 3 3 .75.75 0 1 1 0 1.5 3 3 0 0 0-3 3 .75.75 0 0 1-.75.75Z' />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'duplicate-icon':
      return (
        <>
          <rect
            width={9.337}
            height={9.337}
            x={4.665}
            y={5.165}
            stroke='#505556'
            strokeLinecap='round'
            strokeLinejoin='round'
            rx={1.333}
            fill='none'
          />
          <path
            stroke='#505556'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.665 11.835H3.331A1.334 1.334 0 0 1 1.998 10.5V3.83c0-.736.597-1.333 1.333-1.333h6.67c.737 0 1.334.597 1.334 1.333v1.334'
            fill='none'
          />
        </>
      );
    case 'document-icon':
      return (
        <>
          <path
            fill={fill}
            d='M12 5.667v4.5a.834.834 0 0 1-1.667 0v-5.5H11a1 1 0 0 1 1 1ZM10.667 12H2c-1.333 0-2-.667-2-2V2C0 .667.667 0 2 0h5.333c1.334 0 2 .667 2 2v8.667c0 .736.598 1.333 1.334 1.333Zm-8.5-8.667a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1h-2a.5.5 0 0 0-.5.5Zm5 5.334a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 .5-.5Zm0-2.667a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 .5-.5Z'
          />
        </>
      );
    case 'apikey-copy-icon':
      return (
        <>
          <path
            fill={fill}
            d='M4.413 1.667c-1.72 0-2.746 1.026-2.746 2.746v4.704a.205.205 0 0 1-.22.203C.486 9.224 0 8.643 0 7.587v-5.84C0 .587.587 0 1.747 0h5.84C8.643 0 9.224.486 9.32 1.447a.204.204 0 0 1-.203.22H4.413Zm5.837 1H4.417c-1.167 0-1.75.583-1.75 1.75v5.833c0 1.167.583 1.75 1.75 1.75h5.833c1.167 0 1.75-.583 1.75-1.75V4.417c0-1.167-.583-1.75-1.75-1.75Z'
          />
        </>
      );
    case 'empty-apikey-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M14.36 15.728a1.485 1.485 0 0 1 0-2.567c.08-.05.109-.149.06-.228l-.825-1.422a.158.158 0 0 0-.138-.084c-.03 0-.06.01-.084.025a1.513 1.513 0 0 1-.741.197c-.262 0-.519-.069-.75-.202-.46-.267-.741-.75-.741-1.28a.166.166 0 0 0-.163-.167H9.022a.166.166 0 0 0-.163.168c0 .528-.281 1.012-.74 1.279a1.502 1.502 0 0 1-.751.202c-.257 0-.514-.069-.741-.197a.158.158 0 0 0-.222.06l-.83 1.421a.157.157 0 0 0-.02.08c0 .059.03.113.084.148.46.266.741.75.741 1.279 0 .533-.281 1.022-.736 1.288H5.64c-.079.05-.108.149-.059.228l.825 1.422c.03.054.084.084.138.084.03 0 .06-.01.084-.025a1.502 1.502 0 0 1 1.491.005c.455.267.736.75.736 1.279 0 .094.074.168.168.168h1.956a.166.166 0 0 0 .163-.168c0-.528.281-1.012.74-1.279.232-.133.49-.203.751-.203.257 0 .514.07.74.198.08.05.178.02.223-.06l.83-1.421a.174.174 0 0 0-.064-.227Zm-4.36.198a1.48 1.48 0 0 1-1.482-1.482c0-.82.662-1.481 1.482-1.481s1.481.662 1.481 1.481A1.48 1.48 0 0 1 10 15.926Z'
          />
          <path
            fill='#7B7A79'
            d='M7.222 1.112c1.83 0 3.5.68 4.77 1.8.535.473 1 1.023 1.375 1.633.355-.066.71-.1 1.077-.1A5.558 5.558 0 0 1 20 10.001a5.56 5.56 0 0 1-4.514 5.458 1.292 1.292 0 0 0-.529-.668l-.019-.012-.02-.011a.374.374 0 0 1 0-.646l.016-.01.016-.009c.522-.326.823-1.074.425-1.737l-.815-1.405a1.269 1.269 0 0 0-1.738-.474.4.4 0 0 1-.19.052.392.392 0 0 1-.195-.054.366.366 0 0 1-.185-.317c0-.685-.55-1.279-1.274-1.279H9.022c-.724 0-1.274.594-1.274 1.28a.366.366 0 0 1-.185.316.391.391 0 0 1-.195.054.4.4 0 0 1-.186-.05 1.269 1.269 0 0 0-1.739.466l-.826 1.416a1.285 1.285 0 0 0 .426 1.727l.02.013.019.01c.121.071.187.192.187.319a.383.383 0 0 1-.138.297l-.08.05a1.29 1.29 0 0 0-.345.319A7.225 7.225 0 0 1 7.222 1.112Z'
          />
          <path
            fill='#7B7A79'
            d='M14.121 15.556a1.484 1.484 0 0 1 .24-2.395c.079-.05.108-.148.059-.227l-.825-1.422a.158.158 0 0 0-.138-.084c-.03 0-.06.01-.084.024a1.513 1.513 0 0 1-.74.198c-.262 0-.52-.07-.751-.203-.46-.266-.741-.75-.741-1.279a.165.165 0 0 0-.163-.167H9.022a.166.166 0 0 0-.163.167c0 .529-.281 1.013-.74 1.28a1.502 1.502 0 0 1-.75.202c-.258 0-.514-.07-.742-.198a.158.158 0 0 0-.222.06l-.83 1.422a.157.157 0 0 0-.02.079c0 .06.03.113.085.148.459.267.74.75.74 1.279 0 .382-.144.74-.392 1.011.401.07.813.105 1.234.105H9.02a1.478 1.478 0 0 1-.5-1.111c0-.82.661-1.482 1.481-1.482.82 0 1.482.662 1.482 1.482 0 .443-.194.84-.5 1.111h3.14Z'
          />
        </>
      );
    case 'label-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='m18.844 13.567-5.289 5.3c-1.522 1.51-3.088 1.51-4.6 0l-.893-.904a.333.333 0 0 1 0-.47l9.418-9.419c.13-.13.341-.13.471 0l.892.893c1.568 1.566 1.512 3.077.001 4.6Zm-2.513-6.643-9.418 9.418a.333.333 0 0 1-.47 0L.955 10.856A3.26 3.26 0 0 1 0 8.549V2.167C0 .97.97 0 2.167 0H8.54a3.25 3.25 0 0 1 2.303.956l5.487 5.497c.13.13.13.341 0 .471ZM5.556 4.444a1.11 1.11 0 0 0-1.11-1.11h-.01c-.612 0-1.104.497-1.104 1.11 0 .614.502 1.112 1.114 1.112a1.11 1.11 0 0 0 1.11-1.112Z'
          />
        </>
      );
    case 'edit-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M8.842 11.842H2.526C1 11.842.158 11.001.158 9.474V3.158C.158 1.63.999.789 2.526.789h1.895a.474.474 0 0 1 0 .948H2.526c-.996 0-1.42.425-1.42 1.42v6.317c0 .996.424 1.42 1.42 1.42h6.316c.996 0 1.421-.424 1.421-1.42V7.579a.474.474 0 0 1 .947 0v1.895c0 1.527-.84 2.368-2.368 2.368Zm2.893-10.56L10.718.265a.917.917 0 0 0-1.295.007l-.852.858 2.299 2.3.858-.853c.36-.36.36-.935.007-1.295ZM7.9 1.8 3.79 5.93v2.28h2.28L10.2 4.1l-2.299-2.3Z'
          />
        </>
      );
    case 'label-plus-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill='#fff'
              d='M9.167 4.667H5.833V1.333a.833.833 0 0 0-1.666 0v3.334H.833a.833.833 0 1 0 0 1.666h3.334v3.334a.833.833 0 0 0 1.666 0V6.333h3.334a.833.833 0 0 0 0-1.666Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 .5h10v10H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'file-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M10 3.167v-2l4 4h-2c-1.405 0-2-.596-2-2ZM12 6.5c-2.151 0-3.333-1.182-3.333-3.333V.5H4c-1.778 0-2.667.889-2.667 2.667v10.666c0 1.778.89 2.667 2.667 2.667h8c1.778 0 2.667-.889 2.667-2.667V6.5H12Z'
          />
        </>
      );
    case 'attach-file-icon':
      return (
        <>
          <path
            fill={fill}
            d='M6.65 16.5c-1.582 0-3.055-.604-4.15-1.701-2.306-2.313-2.271-6.11.078-8.467L7.16 1.737A4.178 4.178 0 0 1 10.14.5a4.18 4.18 0 0 1 2.98 1.237 4.234 4.234 0 0 1 0 5.97l-4.605 4.616c-.947.95-2.599.95-3.546 0a2.518 2.518 0 0 1 0-3.55l4.045-4.055a.8.8 0 1 1 1.132 1.13L6.102 9.904a.916.916 0 0 0 0 1.29.926.926 0 0 0 1.28 0l4.605-4.617a2.632 2.632 0 0 0 0-3.71c-.987-.99-2.706-.99-3.693 0L3.71 7.462c-1.698 1.703-1.733 4.546-.077 6.206A4.223 4.223 0 0 0 6.651 14.9c1.184 0 2.34-.476 3.167-1.308L13.84 9.56a.8.8 0 0 1 1.133 1.13l-4.022 4.033a6.114 6.114 0 0 1-4.3 1.778Z'
          />
        </>
      );
    case 'successfull-icon':
      return (
        <>
          <path
            fill='#1D8623'
            fillRule='evenodd'
            d='M12 24.5c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12Zm-2-10.414 6.293-6.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L10 14.086Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'empty-macro-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M15.422 13.333h3.711c-.066.1-.144.178-.233.267l-5.3 5.3a1.747 1.747 0 0 1-.267.233v-3.71c0-1.156.934-2.09 2.09-2.09ZM20 3.744v7.2c0 .245-.022.49-.078.723h-4.5a3.75 3.75 0 0 0-3.755 3.755v4.5a3.13 3.13 0 0 1-.722.078h-7.19C1.245 20 0 18.744 0 16.244v-12.5C0 1.244 1.244 0 3.755 0h12.49C18.755 0 20 1.244 20 3.744Zm-9.167 8.478A.834.834 0 0 0 10 11.39H5.556a.834.834 0 0 0 0 1.667H10c.46 0 .833-.374.833-.834Zm4.445-5a.834.834 0 0 0-.834-.833H5.556a.834.834 0 0 0 0 1.667h8.888c.46 0 .834-.374.834-.834Z'
          />
        </>
      );
  }
};

const SVGIcon = ({
  name = '',
  style = {},
  fill = '',
  viewBox = '',
  height = '24',
  width = '24',
  className = '',
  strokeWidth = 1.5,
  bgfill = 'none',
  stroke = '',
  stopColor = '',
  iconprimary = colors.icon,
}) => (
  <svg
    stroke={stroke}
    width={width}
    style={style}
    height={height}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    {getPath(name, {
      fill,
      strokeWidth,
      bgfill,
      stroke,
      stopColor,
      iconprimary,
    })}
  </svg>
);

export default SVGIcon;
