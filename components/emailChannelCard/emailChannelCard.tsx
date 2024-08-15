import { useState } from 'react';
import Input from '../input/input';
import Button from '../button/button';
import {
  CheckBox,
  Description,
  Div,
  Head,
  InputDiv,
  ProfileDetail,
  StepContent,
  StepName,
  StyledCheckbox,
  Table,
  TableWrapper,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
interface Props {
  stepName?: string;
  stepContent?: string;
  description?: string;
  label?: string;
  isOpen: boolean;
  onToggle: () => void;
  currentStep: number;
  onSaveAndContinue: () => void;
}
export function EmailChannelCard({
  stepName,
  stepContent,
  description,
  label,
  isOpen,
  onToggle,
  currentStep,
  onSaveAndContinue,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <ProfileDetail isOpen={isOpen}>
        <Head onClick={onToggle}>
          <StepName>{stepName}</StepName>
          <StepContent>{stepContent}</StepContent>
        </Head>
        {isOpen && (
          <Div>
            <Description>{description}</Description>
            {currentStep === 1 && (
              <Input placeholder='e.g. support@pixer.io' className='input' />
            )}
            {currentStep === 2 && (
              <>
                <InputDiv className='copy-icon'>
                  <Description>{label}</Description>
                  <Input
                    placeholder='40c17585b3fe12467fb00efc70ddc46d@inbound.postmarkapp.com'
                    className='copy-icon'
                  />
                  <SVGIcon
                    name='copy-icon'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                  />
                  <CheckBox isChecked={isChecked}>
                    <StyledCheckbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <p>Inbound email forwarding is set up</p>
                  </CheckBox>
                </InputDiv>
                <Button
                  title='Save and Continue'
                  onClick={onSaveAndContinue}
                  disabled={!isChecked}
                />
              </>
            )}
            {currentStep === 3 && (
              <>
                <Description>{label}</Description>
                <TableWrapper>
                  <Table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>TXT</td>
                        <td>_vercel.teamcamp.app</td>
                        <td>
                          <span>
                            ve- donan
                            <br />
                            verify=docs.teapcaso.a00.19087c03680302478e1
                          </span>
                          <SVGIcon
                            name='duplicate-icon'
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>CNAME</td>
                        <td>docs</td>
                        <td>
                          cname.vencz-dns.com
                          <SVGIcon
                            name='duplicate-icon'
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </TableWrapper>
                <p>
                  It might take a couple of minutes for your DNS changes to
                  propagate, although in some cases it can take up to 24 hours.
                </p>
                <Button title='Verify DNS and continue' />
              </>
            )}
            {currentStep === 1 && (
              <Button title='Save and Continue' onClick={onSaveAndContinue} />
            )}
          </Div>
        )}
      </ProfileDetail>
    </div>
  );
}
