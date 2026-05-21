export default function Warning({onclick}:{onclick: ()=>void}){
    return (
        <div className="flex max-h-110 overflow-auto flex-col gap-2 p-5 fixed items-center bg-green-400 z-20 w-[80dvw] max-w-md  top-20 left-[10dvw] md:left-[calc((100dvw-448px)/2)]">
            <h1 className="font-bold text-lg">⚠️ Email Service Limitation Notice</h1>
            <p className="text-sm"> We are currently using the Resend email service, but due to domain not being verified, the service is running in restricted mode. Because of this, OTP emails can only be delivered to registered/verified email addresses. Emails to unverified addresses may not be delivered. If you do not receive the OTP email, you can use the bypass OTP "123456" for testing purposes.</p>
            <p className="text-sm"> हम अभी Resend email service का उपयोग कर रहे हैं, लेकिन domain verify न होने के कारण यह service restricted mode में चल रही है। इस वजह से OTP email केवल registered/verified email addresses पर ही भेजी जा सकती है। अन्य (unverified) email addresses पर OTP deliver नहीं हो सकता। अगर OTP email प्राप्त नहीं होता है, तो आप testing के लिए bypass OTP "123456" का उपयोग कर सकते हैं।</p>
            
            <button className="font-bold" type="button" onClick={onclick}>Close</button>
        </div>
    )
}