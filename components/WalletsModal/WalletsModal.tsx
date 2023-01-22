import { useCallback, useState } from 'react';
import { useLocalStorage } from '../../sdk/hooks';
import { Modal } from '../ui';
import {
  WalletsModalProps,
  ButtonsCommonProps,
  RequirementsData,
} from './types';
// import { Terms } from '../Terms';
import { WalletsButtonsContainer } from './WalletsModalStyles';
import { VOID_FN } from '../ui/utils';

export function WalletsModal(props: WalletsModalProps): JSX.Element {
  const {
    onClose,
    shouldInvertWalletIcon = false,
    buttonsFullWidth = false,
  } = props;

  const [termsChecked, setTermsChecked] = useLocalStorage(
    'collective-terms-agree',
    false,
  );

  const handleTermsToggle = useCallback(() => {
    setTermsChecked((currentValue: boolean) => !currentValue);
  }, [setTermsChecked]);

  const [requirementsVisible, setRequirementsVisible] = useState(false);
  const [requirementsData, setRequirementsData] = useState<RequirementsData>(
    {},
  );

  const setRequirements = useCallback(
    (isVisible: boolean, requirementsData: RequirementsData = {}) => {
      setRequirementsVisible(isVisible);
      setRequirementsData(requirementsData);
    },
    [],
  );

  const buttonsCommonProps: ButtonsCommonProps = {
    // disabled: !termsChecked,
    disabled: false,
    onConnect: onClose,
    shouldInvertWalletIcon,
    setRequirements,
  };

  // pass-into function is cheap, so we're losing performance on useCallback here
  const hideRequirements = () => {
    setRequirements(false);
  };

  const handleClose = onClose || VOID_FN;

  const { icon: reqIcon, title: reqTitle, text: reqText } = requirementsData;

  return (
    <>
      {requirementsVisible ? (
        <Modal
          {...props} // the props are overridden here on purpose
          onClose={handleClose}
          onBack={hideRequirements}
          onExited={hideRequirements}
          center={true}
          title={reqTitle}
          subtitle={reqText}
          titleIcon={reqIcon}
        >
          <></>
        </Modal>
      ) : (
        <Modal
          title={'Connect wallet'}
          {...props} // the props can be overridden by a library user
          center={false}
          onClose={handleClose}
        >
          {/* <Terms onChange={handleTermsToggle} checked={termsChecked} /> */}
          <WalletsButtonsContainer $buttonsFullWidth={buttonsFullWidth}>
            {props.children(buttonsCommonProps)}
          </WalletsButtonsContainer>
        </Modal>
      )}
    </>
  );
}
