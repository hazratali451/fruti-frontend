/* eslint-disable @next/next/no-img-element */
import englishToBanglaNumbers from "@/utls/Language/entoBnNumber";
import Image from "next/image";
import Link from "next/link";
import Language from "../helper/Language";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <Link className="footer-logo" href="/">
            <Image
              width={324}
              height={154}
              src={"/images/logo.png"}
              alt={"logo"}
            />
          </Link>
          <div className="footer-widget">
            <h6 className="subtitle">
              <Language
                data={{
                  en: "About Bogura Theke",
                  bn: "আমাদের সম্পর্কে",
                }}
              />
            </h6>
            <ul className="links">
              <li>
                <Link href={"/about"}>
                  <Language
                    data={{
                      en: "About Bogura Theke",
                      bn: "আমাদের সম্পর্কে",
                    }}
                  />
                </Link>
              </li>
              {/* <li>
								<Link href={"/recipes"}>
									<Language
										data={{
											bn: "অর্ডার ট্রাকিং",
											en: "Order Tracking",
										}}
									/>
								</Link>
							</li> */}
              <li>
                <Link href={"/login"}>
                  <Language
                    data={{
                      bn: "আমার অ্যাকাউন্ট",
                      en: "My Account",
                    }}
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-widget">
            <h6 className="subtitle">
              <Language
                data={{
                  en: "Contact us",
                  bn: "যোগাযোগ করুন",
                }}
              />
            </h6>
            <ul className="links">
              <li>
                <Language
                  data={{
                    en: " 2nd colony, Mazar road, Mirpur 1, Dhaka",
                    bn: " ২য় কলোনী, মাজার রোড, মিরপুর ১, ঢাকা",
                  }}
                />
              </li>
              <li>
                <Link href={"tel:+8801332743232"}>+8801332743232</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            <Language
              data={{
                en: `© ${new Date().getFullYear()} boguratheke.com. All Rights Reserved`,
                bn: `© ${englishToBanglaNumbers(
                  new Date().getFullYear()
                )} boguratheke.com সমস্ত অধিকার সংরক্ষিত`,
              }}
            />
          </div>
          <div className="social">
            <Link href="https://wa.me/8801332743232" target="_blank">
              <Image
                src={"/images/social/whatsapp.png"}
                width={30}
                height={30}
                alt="whatsapp"
              />
            </Link>
            <Link href="https://www.facebook.com/boguratheke/" target="_blank">
              <img
                src={"/images/social/facebook.png"}
                width={28}
                height={28}
                alt="facebook"
              />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UC8pYBQTeE3qT9fz3SOVKwCg"
              target="_blank"
            >
              <img
                src={"/images/social/youtube.png"}
                width={29}
                height={29}
                alt="whatsapp"
              />
            </Link>
          </div>
          <div className="links">
            <Link href="/privacy-policy">
              <Language
                data={{
                  en: "Privacy Policy",
                  bn: "গোপনীয়তা নীতি",
                }}
              />
            </Link>
            <div className="border-right border"></div>
            <Link href="/terms-and-conditions">
              <Language
                data={{
                  en: "Terms & Conditions",
                  bn: "ওয়েবসাইটের শর্তাবলী",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
