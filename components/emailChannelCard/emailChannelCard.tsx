import { ChangeEvent, useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import Input from '../input/input';
import Button from '../button/button';
import {
  CheckBox,
  Description,
  Div,
  EmailAddressDiv,
  Head,
  InputDiv,
  ProfileDetail,
  StepContent,
  StepName,
  StyledCheckbox,
  Table,
  TableWrapper,
} from './style';
interface Props {
  stepName?: string;
  stepContent?: string;
  description?: string;
  label?: string;
  isOpen: boolean;
  currentStep: number;
  // eslint-disable-next-line no-unused-vars
  onSaveAndContinue: (inputValue?: string) => void;
}
export function EmailChannelCard({
  stepName,
  stepContent,
  description,
  label,
  isOpen,
  currentStep,
  onSaveAndContinue,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSave = () => {
    onSaveAndContinue(inputValue);
  };
  return (
    <div>
      <ProfileDetail isOpen={isOpen}>
        <Head>
          <StepName>{stepName}</StepName>
          <StepContent>{stepContent}</StepContent>
        </Head>
        {isOpen && (
          <Div>
            <Description>{description}</Description>
            {currentStep === 1 && (
              <>
                <Input
                  placeholder='e.g. support@pixer.io'
                  className='input'
                  value={inputValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                  }
                />
                <Button
                  title='Save and Continue'
                  onClick={handleSave}
                  variant='medium'
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <InputDiv>
                  <Description>{label}</Description>
                  <EmailAddressDiv>
                    <p>
                      40c17585b3fe12467fb00efc70ddc46d@inbound.postmarkapp.com
                    </p>
                    <SVGIcon
                      name='apikey-copy-icon'
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                    />
                  </EmailAddressDiv>
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
                  variant='medium'
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
                          <div className='td-div'>
                            ve- donan
                            verify=docs.teapcaso.a00.19087c03680302478e1
                            <div className='copy-icon'>
                              <SVGIcon
                                name='apikey-copy-icon'
                                width='12'
                                height='12'
                                viewBox='0 0 12 12'
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>CNAME</td>
                        <td>docs</td>
                        <td>
                          <div className='td-div'>
                            cname.vencz-dns.com
                            <div className='copy-icon'>
                              <SVGIcon
                                name='apikey-copy-icon'
                                width='12'
                                height='12'
                                viewBox='0 0 12 12'
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </TableWrapper>
                <Description>
                  It might take a couple of minutes for your DNS changes to
                  propagate, although in some cases it can take up to 24 hours.
                </Description>
                <Button title='Verify DNS and continue' variant='medium' />
              </>
            )}
            {/* {currentStep === 1 && (
              <Button
                title='Save and Continue'
                onClick={handleSave}
                variant='medium'
              />
            )} */}
          </Div>
        )}
      </ProfileDetail>
    </div>
  );
}
