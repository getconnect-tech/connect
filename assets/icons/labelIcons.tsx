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
    case 'tag-icon':
      return (
        <>
          <path
            fill={fill}
            d='m11.307 8.14-3.174 3.18c-.913.907-1.853.907-2.76 0l-.536-.542a.2.2 0 0 1 0-.283l5.651-5.65a.2.2 0 0 1 .283 0l.535.535c.94.94.907 1.847 0 2.76ZM9.799 4.155l-5.651 5.65a.2.2 0 0 1-.283 0L.573 6.513A1.956 1.956 0 0 1 0 5.13V1.3A1.3 1.3 0 0 1 1.3 0h3.825a1.95 1.95 0 0 1 1.382.573l3.292 3.299a.2.2 0 0 1 0 .283ZM3.333 2.667A.666.666 0 0 0 2.668 2h-.007A.664.664 0 0 0 2 2.667a.666.666 0 1 0 1.334 0Z'
          />
        </>
      );
    case 'bug-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M12 10.954a.462.462 0 0 1-.924 0c0-.763-.621-1.384-1.384-1.384h-.423a3.687 3.687 0 0 1-2.589 1.934.189.189 0 0 1-.218-.187v-4.67A.465.465 0 0 0 6 6.185a.465.465 0 0 0-.461.462v4.67a.189.189 0 0 1-.219.187A3.687 3.687 0 0 1 2.732 9.57h-.424c-.763 0-1.385.62-1.385 1.384a.462.462 0 0 1-.923 0 2.31 2.31 0 0 1 2.308-2.307h.088a3.683 3.683 0 0 1-.088-.77v-.769H.462a.462.462 0 0 1 0-.923h1.846V4.801c0-.057.008-.105.01-.159A2.29 2.29 0 0 1 .22 3.066l-.196-.58A.462.462 0 0 1 .9 2.192l.197.585c.182.56.699.938 1.287.947l.162.002c.281-.511.816-.77 1.609-.77h3.692c.793 0 1.327.259 1.609.77.05 0 .104 0 .162-.002a1.371 1.371 0 0 0 1.285-.942l.198-.59a.462.462 0 0 1 .875.295l-.196.586a2.29 2.29 0 0 1-2.097 1.57c.002.054.01.102.01.159v1.384h1.847a.462.462 0 0 1 0 .923H9.692v.77c0 .265-.035.52-.088.769h.088a2.31 2.31 0 0 1 2.307 2.307ZM4.42 2.032h3.16c.12 0 .216-.115.18-.23A1.84 1.84 0 0 0 6 .494a1.84 1.84 0 0 0-1.761 1.31c-.035.114.061.229.18.229Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'question-tag-icon':
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
    case 'like-icon':
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

    case 'vector-icon':
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

    case 'pie-chart-icon':
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

    case 'users-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M10.358 4.144c-.174.546-.62.989-1.166 1.16a1.852 1.852 0 0 1-2.146-.771.17.17 0 0 1 0-.173c.248-.444.389-.956.389-1.503 0-.19-.017-.375-.05-.556a.17.17 0 0 1 .054-.16 1.8 1.8 0 0 1 1.167-.427 1.848 1.848 0 0 1 1.752 2.43ZM9.491 6.16H8.36a.168.168 0 0 0-.171.172c0 .045.017.091.051.12l.017.017c.8.771 1.172 1.874 1.172 2.971 0 .212-.012.417-.046.606a.298.298 0 0 0-.008.069c0 .097.076.17.168.17h.834c1.046 0 1.623-.57 1.623-1.61 0-1.16-.657-2.515-2.509-2.515ZM4.291.572a2.285 2.285 0 1 0 0 4.57 2.285 2.285 0 0 0 0-4.57ZM5.43 6.286H3.143C.823 6.286 0 7.983 0 9.44c0 1.303.691 1.989 2 1.989h4.571c1.309 0 2-.686 2-1.989 0-1.457-.822-3.154-3.142-3.154Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'life-ring-icon':
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

    case 'sign-direction-right-icon':
      return (
        <>
          <path
            fill={fill}
            d='M10.416 4.589 8.66 6.345a.924.924 0 0 1-.653.27H1.886C1.128 6.615.75 6.237.75 5.48V2.83c0-.758.378-1.137 1.136-1.137h2.71V.462c0-.253.21-.462.462-.462s.461.21.461.462v1.23h2.488c.245 0 .48.098.653.27l1.756 1.757c.241.24.241.63 0 .87Zm-3.512 6.488H5.52V7.538h-.923v3.539H3.212a.462.462 0 0 0 0 .923h3.692a.462.462 0 0 0 0-.923Z'
          />
        </>
      );

    case 'user-circle-icon':
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

    case 'home-dash-user-icon':
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
    case 'exclamation-icon':
      return (
        <>
          <path
            fill={fill}
            d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm-.45 3.3a.45.45 0 0 1 .9 0v2.743a.45.45 0 0 1-.9 0V3.3Zm.462 5.4a.603.603 0 0 1-.603-.6c0-.331.266-.6.597-.6h.006a.6.6 0 1 1 0 1.2Z'
          />
        </>
      );
    case 'building-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.4 10.725h-.9v-8.55c0-1.2-.6-1.8-1.8-1.8H3.3c-1.2 0-1.8.6-1.8 1.8v8.55H.6a.45.45 0 0 0 0 .9h10.8a.45.45 0 0 0 0-.9Zm-4.2-8.4h.6a.45.45 0 0 1 0 .9h-.6a.45.45 0 0 1 0-.9Zm0 1.8h.6a.45.45 0 0 1 0 .9h-.6a.45.45 0 0 1 0-.9Zm0 1.8h.6a.45.45 0 0 1 0 .9h-.6a.45.45 0 0 1 0-.9Zm-3-3.6h.6a.45.45 0 0 1 0 .9h-.6a.45.45 0 0 1 0-.9Zm0 1.8h.6a.45.45 0 0 1 0 .9h-.6a.45.45 0 0 1 0-.9Zm0 1.8h.6a.45.45 0 0 1 0 .9h-.6a.45.45 0 0 1 0-.9Zm.45 3.15c0-.6.3-.9.9-.9h.9c.6 0 .9.3.9.9v1.65h-2.7v-1.65Z'
          />
        </>
      );
    case 'clock-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm2.118 8.118a.449.449 0 0 1-.636 0l-1.8-1.8A.45.45 0 0 1 5.55 6V3a.45.45 0 0 1 .9 0v2.813l1.668 1.668a.45.45 0 0 1 0 .637Z'
            clipRule='evenodd'
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
    case 'comment-text-icon':
      return (
        <>
          <path
            fill={fill}
            d='M6 .333c-3.313 0-6 2-6 5.334 0 1.414.487 2.595 1.3 3.475-.1.64-.46 1.373-1.187 1.96-.22.186-.093.553.194.56.946.033 2.406-.094 3.3-1.047C4.34 10.868 5.147 11 6 11c3.313 0 6-2 6-5.334C12 2.333 9.313.333 6 .333ZM6.667 7.5H3.333a.5.5 0 0 1 0-1h3.334a.5.5 0 0 1 0 1Zm2-2.667H3.333a.5.5 0 0 1 0-1h5.334a.5.5 0 0 1 0 1Z'
          />
        </>
      );
    case 'paper-clip-icon':
      return (
        <>
          <path
            fill={fill}
            d='M4.988 12a4.357 4.357 0 0 1-3.112-1.276C.146 8.989.172 6.14 1.933 4.374L5.37.928A3.134 3.134 0 0 1 7.605 0C8.45 0 9.242.329 9.84.928a3.175 3.175 0 0 1 0 4.477L6.386 8.868c-.71.711-1.949.712-2.66 0a1.888 1.888 0 0 1 0-2.663L6.76 3.163a.6.6 0 1 1 .85.848L4.576 7.053a.687.687 0 0 0 0 .967.694.694 0 0 0 .96 0L8.99 4.558a1.974 1.974 0 0 0 0-2.783c-.74-.742-2.03-.742-2.77 0L2.783 5.22c-1.273 1.278-1.3 3.41-.057 4.655a3.167 3.167 0 0 0 2.262.924c.888 0 1.755-.357 2.376-.98l3.016-3.026a.6.6 0 0 1 .85.847l-3.017 3.025A4.585 4.585 0 0 1 4.988 12Z'
          />
        </>
      );
    case 'true-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              fillRule='evenodd'
              d='M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12ZM5 6.793l3.147-3.147a.5.5 0 0 1 .707.707l-3.5 3.5a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.707L5 6.793Z'
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
    case 'envelope-icon':
      return (
        <>
          <path
            fill={fill}
            d='M10 1H2C.667 1 0 1.667 0 3v6c0 1.333.667 2 2 2h8c1.333 0 2-.667 2-2V3c0-1.333-.667-2-2-2Zm-.04 3.07L6.687 6.453a1.165 1.165 0 0 1-1.372 0L2.039 4.072a.5.5 0 1 1 .589-.809l3.275 2.381a.166.166 0 0 0 .195 0l3.275-2.381a.5.5 0 1 1 .588.809Z'
          />
        </>
      );
    case 'phone-icon':
      return (
        <>
          <path
            fill={fill}
            d='m9.75 7.45 1.762 1.05a1 1 0 0 1 .468 1.056c-.34 1.706-2.053 2.8-3.731 2.339A11.627 11.627 0 0 1 .106 3.757C-.355 2.078.736.364 2.443.022L2.455.02c.416-.083.841.106 1.058.472L4.555 2.25c.37.626.186 1.432-.42 1.834l-1.107.737a7.735 7.735 0 0 0 4.14 4.15l.744-1.11A1.369 1.369 0 0 1 9.75 7.45Z'
          />
        </>
      );
    case 'calender-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.684 5.084v5.021c0 1.263-.631 1.895-1.895 1.895H2.21C.947 12 .316 11.368.316 10.105v-5.02a.19.19 0 0 1 .19-.19h10.989a.19.19 0 0 1 .19.19ZM9.79 1.58H9V.632a.477.477 0 0 0-.473-.474.477.477 0 0 0-.473.474v.947H3.947V.632a.477.477 0 0 0-.473-.474A.477.477 0 0 0 3 .632v.947h-.79c-1.263 0-1.894.632-1.894 1.895v.284c0 .105.084.19.19.19h10.989a.19.19 0 0 0 .19-.19v-.284c0-1.263-.633-1.895-1.896-1.895Z'
          />
        </>
      );
    case 'trash-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.833 2a.5.5 0 0 1-.5.5H.667a.5.5 0 0 1 0-1h2.81c.061-.121.11-.259.16-.412l.135-.405A1 1 0 0 1 4.721 0h2.558a1 1 0 0 1 .95.683l.134.405c.051.153.1.29.161.412h2.81a.5.5 0 0 1 .5.5Zm-1.46 1.167a.2.2 0 0 1 .2.213l-.446 6.753C10.053 11.187 9.5 12 8.127 12H3.873c-1.373 0-1.926-.813-2-1.867L1.427 3.38a.2.2 0 0 1 .2-.213h8.746ZM5.167 5.333c0-.273-.227-.5-.5-.5-.274 0-.5.227-.5.5v3.334c0 .273.226.5.5.5.273 0 .5-.227.5-.5V5.333Zm2.666 0c0-.273-.226-.5-.5-.5-.273 0-.5.227-.5.5v3.334c0 .273.227.5.5.5.274 0 .5-.227.5-.5V5.333Z'
          />
        </>
      );
    case 'edit-icon':
      return (
        <>
          <path
            fill={fill}
            d='M8.842 11.842H2.526C1 11.842.158 11.001.158 9.474V3.158C.158 1.63.999.789 2.526.789h1.895a.474.474 0 0 1 0 .948H2.526c-.996 0-1.42.425-1.42 1.42v6.317c0 .996.424 1.42 1.42 1.42h6.316c.996 0 1.421-.424 1.421-1.42V7.579a.474.474 0 0 1 .948 0v1.895c0 1.527-.842 2.368-2.369 2.368Zm2.893-10.56L10.718.265a.917.917 0 0 0-1.295.007l-.852.858 2.299 2.3.859-.853c.36-.36.36-.935.006-1.295ZM7.9 1.8 3.79 5.93v2.28h2.28L10.2 4.1l-2.299-2.3Z'
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
    case 'eye-icon':
      return (
        <>
          <path
            fill={fill}
            d='M7.833 6A1.835 1.835 0 0 1 6 7.833 1.835 1.835 0 0 1 4.167 6c0-.233.048-.453.127-.659.13.103.285.174.463.174.418 0 .758-.34.758-.758a.742.742 0 0 0-.174-.463c.206-.08.426-.127.659-.127 1.011 0 1.833.822 1.833 1.833Zm3.895.985C10.91 8.354 9.073 10.667 6 10.667S1.09 8.354.272 6.985a1.918 1.918 0 0 1 0-1.97C1.09 3.645 2.927 1.333 6 1.333s4.91 2.313 5.728 3.682a1.919 1.919 0 0 1 0 1.97ZM8.833 6A2.837 2.837 0 0 0 6 3.167 2.837 2.837 0 0 0 3.167 6 2.837 2.837 0 0 0 6 8.833 2.837 2.837 0 0 0 8.833 6Z'
          />
        </>
      );
    case 'brief-case-icon':
      return (
        <>
          <path
            fill={fill}
            d='M9.79 2.29H9v-.948A1.11 1.11 0 0 0 7.895.237h-3.79C3.493.237 3 .736 3 1.342v.948h-.79C.947 2.29.316 2.92.316 4.184v.607c0 .587.347 1.105.89 1.313.872.348 1.775.613 2.678.803.07.012.133-.038.17-.095C4.51 6.13 5.243 5.719 6 5.719c.764 0 1.49.41 1.951 1.093.038.057.102.107.171.095.903-.19 1.8-.455 2.672-.796.543-.215.89-.733.89-1.32v-.607c0-1.263-.631-1.894-1.895-1.894Zm-5.843 0v-.948c0-.088.07-.158.158-.158h3.79c.088 0 .158.07.158.158v.948H3.947Zm4.364 5.545a1.13 1.13 0 0 1-1.15-.499c-.277-.417-.713-.67-1.161-.67-.442 0-.878.253-1.156.67-.265.392-.714.587-1.15.499-.96-.196-1.913-.48-2.835-.846a2.015 2.015 0 0 1-.543-.31v3.19c0 1.263.631 1.894 1.894 1.894h7.58c1.263 0 1.894-.631 1.894-1.894V6.685a2.178 2.178 0 0 1-.543.304c-.922.366-1.876.65-2.83.846Zm-2.31.77a.633.633 0 0 1-.633-.631c0-.349.28-.632.628-.632h.005a.631.631 0 0 1 0 1.263Z'
          />
        </>
      );
    case 'bell-icon':
      return (
        <>
          <path
            fill={fill}
            d='M7.298 10.65a.3.3 0 0 1-.001.301A1.49 1.49 0 0 1 6 11.7a1.49 1.49 0 0 1-1.297-.749.3.3 0 0 1 .259-.451h2.076c.107 0 .206.058.26.15Zm3.736-1.237c-.011-.014-1.137-1.444-1.137-3.113V4.197A3.902 3.902 0 0 0 6 .3a3.902 3.902 0 0 0-3.897 3.897V6.3c0 1.669-1.126 3.098-1.138 3.113A.3.3 0 0 0 1.2 9.9h9.6a.3.3 0 0 0 .235-.487Z'
          />
        </>
      );
    case 'home-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M10 12H7.865a.2.2 0 0 1-.2-.2V9a1.666 1.666 0 1 0-3.333 0v2.8a.2.2 0 0 1-.2.2H2c-1.333 0-2-.666-2-2V5.769C0 4.436.349 4.23.953 3.725L4.93.39c.62-.519 1.523-.519 2.142 0l3.976 3.335c.604.506.953.71.953 2.043V10c0 1.333-.667 2-2 2Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'shopping-bag-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M4.263 3.79h-.947v-.948A2.69 2.69 0 0 1 6 .158a2.69 2.69 0 0 1 2.684 2.684v.948h-.947v-.948a1.736 1.736 0 1 0-3.474 0v.948Zm5.842 0h-1.42v1.894a.477.477 0 0 1-.475.474.477.477 0 0 1-.473-.474V3.79H4.263v1.894a.477.477 0 0 1-.474.474.477.477 0 0 1-.473-.474V3.79H1.895a.946.946 0 0 0-.948.947v5.368C.947 11.368 1.58 12 2.842 12h6.316c1.263 0 1.895-.632 1.895-1.895V4.737a.946.946 0 0 0-.948-.947Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'shopping-cart-icon':
      return (
        <>
          <path
            fill={fill}
            d='M4.213 12a.753.753 0 0 1-.753-.75c0-.413.333-.75.747-.75h.006a.75.75 0 0 1 0 1.5Zm5.55-.75a.75.75 0 0 0-.75-.75h-.006a.748.748 0 0 0-.747.75.75.75 0 0 0 1.503 0ZM6.6 6.9a.453.453 0 0 1-.45-.45c0-.245.204-.45.45-.45h4.24a.18.18 0 0 0 .178-.15l.357-2.184A1.198 1.198 0 0 0 10.2 2.25H2.965l-.126-.832A1.638 1.638 0 0 0 1.205 0H1.05a.45.45 0 0 0 0 .9h.15c.377 0 .696.277.75.65l.9 6.268A1.197 1.197 0 0 0 4.037 8.85H9c1.26 0 1.614-.624 1.77-1.476l.043-.261s.039-.213-.163-.213H6.6Z'
          />
        </>
      );
    case 'star-icon':
      return (
        <>
          <path
            fill={fill}
            d='m6.641.731 1.295 2.611a.667.667 0 0 0 .503.364l2.989.432c.548.08.767.752.37 1.137l-2.16 2.097a.665.665 0 0 0-.193.59l.494 2.87a.714.714 0 0 1-1.036.752l-2.592-1.357a.668.668 0 0 0-.62 0L3.1 11.582a.715.715 0 0 1-1.038-.753l.494-2.867a.665.665 0 0 0-.192-.59L.205 5.275a.665.665 0 0 1 .369-1.137l2.989-.432a.669.669 0 0 0 .503-.364L5.361.731a.715.715 0 0 1 1.28 0Z'
          />
        </>
      );
    case 'globe-icon':
      return (
        <>
          <path
            fill={fill}
            d='M2.898 6.45c.09 1.848.714 3.732 1.8 5.406A6.004 6.004 0 0 1 .018 6.45h2.88Zm1.8-6.306A6.004 6.004 0 0 0 .018 5.55h2.88c.09-1.848.714-3.732 1.8-5.406ZM6.12 0h-.24L5.7.258c-1.14 1.62-1.806 3.48-1.902 5.292h4.404C8.106 3.738 7.44 1.878 6.3.258L6.12 0ZM3.798 6.45c.096 1.812.762 3.672 1.902 5.292l.18.258h.24l.18-.258c1.14-1.62 1.806-3.48 1.902-5.292H3.798Zm5.304 0c-.09 1.848-.714 3.732-1.8 5.406a6.004 6.004 0 0 0 4.68-5.406h-2.88Zm2.88-.9A6.004 6.004 0 0 0 7.302.144c1.086 1.674 1.71 3.558 1.8 5.406h2.88Z'
          />
        </>
      );
    case 'folder-icon':
      return (
        <>
          <path
            fill={fill}
            d='M12 4.667v4.666c0 1.334-.667 2-2 2H2c-1.333 0-2-.666-2-2V2.667c0-1.334.667-2 2-2h2.667l2 2H10c1.333 0 2 .666 2 2Z'
          />
        </>
      );
    case 'flag-icon':
      return (
        <>
          <path
            fill={fill}
            d='M7.833 6A1.835 1.835 0 0 1 6 7.833 1.835 1.835 0 0 1 4.167 6c0-.233.048-.453.127-.659.13.103.285.174.463.174.418 0 .758-.34.758-.758a.742.742 0 0 0-.174-.463c.206-.08.426-.127.659-.127 1.011 0 1.833.822 1.833 1.833Zm3.895.985C10.91 8.354 9.073 10.667 6 10.667S1.09 8.354.272 6.985a1.918 1.918 0 0 1 0-1.97C1.09 3.645 2.927 1.333 6 1.333s4.91 2.313 5.728 3.682a1.919 1.919 0 0 1 0 1.97ZM8.833 6A2.837 2.837 0 0 0 6 3.167 2.837 2.837 0 0 0 3.167 6 2.837 2.837 0 0 0 6 8.833 2.837 2.837 0 0 0 8.833 6Z'
          />
        </>
      );
    case 'location-pin-icon':
      return (
        <>
          <path
            fill={fill}
            d='M6 .3A5.106 5.106 0 0 0 .9 5.4c0 2.99 2.777 4.825 4.615 6.038l.318.212a.3.3 0 0 0 .332 0l.319-.212C8.32 10.225 11.099 8.39 11.099 5.4a5.104 5.104 0 0 0-5.1-5.1Zm0 6.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z'
          />
        </>
      );
    case 'grid-square-circle-icon':
      return (
        <>
          <path
            fill={fill}
            d='M7.5 9.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM10.875 0h-2.25C7.875 0 7.5.375 7.5 1.125v2.25c0 .75.375 1.125 1.125 1.125h2.25c.75 0 1.125-.375 1.125-1.125v-2.25C12 .375 11.625 0 10.875 0Zm-7.5 0h-2.25C.375 0 0 .375 0 1.125v2.25C0 4.125.375 4.5 1.125 4.5h2.25c.75 0 1.125-.375 1.125-1.125v-2.25C4.5.375 4.125 0 3.375 0Zm0 7.5h-2.25C.375 7.5 0 7.875 0 8.625v2.25C0 11.625.375 12 1.125 12h2.25c.75 0 1.125-.375 1.125-1.125v-2.25c0-.75-.375-1.125-1.125-1.125Z'
          />
        </>
      );
    case 'laptop-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.333 3v4.8a.2.2 0 0 1-.2.2H.867a.2.2 0 0 1-.2-.2V3c0-1.333.666-2 2-2h6.666c1.334 0 2 .667 2 2Zm.467 6H.2a.2.2 0 0 0-.2.2v.467C0 10.555.445 11 1.333 11h9.334C11.555 11 12 10.555 12 9.667V9.2a.2.2 0 0 0-.2-.2Z'
          />
        </>
      );
    case 'shield-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.4 5.333c0 4-3.4 6-5.4 6.667C4 11.333.6 9.334.6 5.333V1.8C3.6 1.2 4.667.667 6.01 0 7.335.667 8.4 1.2 11.4 1.8v3.533Z'
          />
        </>
      );
  }
};

const LabelSvgIcon = ({
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

export default LabelSvgIcon;