/**
 * Created by TaoQing_Office on 2017/9/4.
 */
class WebConstants {
  SERVER_URL = 'https://www.jieshu.mobi:8181';
  WEB_MODULE_PATH = '/YanglaoServer-war';
  RETRIEVE_SERVICE_REQUEST_LIST_API = '/RetrieveServiceRequestServlet';
  RETRIEVE_EVENT_LIST_API = '/RetrieveEventServlet';
  RETRIEVE_EVENT_BY_EVENTID_API = '/RetrieveEventByEventIdServlet';
  RETRIEVE_MY_PROFILE_DATA_API = '/RetrieveMyProfileDataServlet';
  RETRIEVE_MY_EVENTS_API = '/RetrieveMyEventsServlet';
  RETRIEVE_GUEST_DATA_API = '/RetrieveGuestDataServlet';
  UPDATE_SERVICE_REQUEST_API = '/UpdateServiceRequestServlet';
  CHECK_FOR_PREVIOUS_APPLICATION_API = '/RetrieveEventParticipantsServlet';
  LOGIN_API = '/LoginServlet';
  REGISTER_API = '/RegisterServlet';
  VALIDATION_CODE_API = '/GenerateValidationCodeServlet';
  VALIDATION_CODE = 'validation_code';
  VALIDATION_TOKEN = 'validation_token';
  APPLY_FOR_EVENT_API = '/ApplyEventServlet';
  SERVICE_REQUEST_ID = 'service_request_id';
  SERVICE_TYPE = 'service_type';
  SERVICE_COMMENT = 'service_comment';
  // Login page constants
  USER_NAME = 'user_name';
  USER_MOBILEPHONE_NUMBER = 'user_mobilephone_number';
  PASSWORD = 'password';
  GENDER = 'gender';
  LOGIN_SUCCESS = 'login_success';
  CORRECT_PASSWORD = 'correct_password';
  USER_EXIST = 'user_exist';
  PROFESSIONAL_EXIST = 'professional_exist';
  TOKEN = 'token';
  AUTHORIZATION = 'Authorization';
  // Registeration page constants
  REGISTRATION_RESULT = 'registration_result';
  ALREADY_REGISTERED = 'already_registered';
  VALID_PHONENUMBER = 'valid_phonenumber';
  SUCCESS = 'success';
  VALIDATION_CODE_VALID = 'validation_code_valid';
  VALIDATION_CODE_SUCCESS_HINT = '验证码发送成功';
  REGISTRATION_SUCCESS_HINT = '注册成功';
  GO_TO_LOGIN_PAGE = '马上去登录';
  // Apply_for_event page constants
  EVENT_ID = 'event_id';
  APPLY_EVENT_STATUS = 'apply_event_status';
  EVENT_APPLICATION_SUCCESS_HINT = '申请成功';
  EVENT_APPLICATION_FAILURE_HINT = '申请失败';
  GO_TO_CORE_CONTENT_PAGE = '返回主页';
  PREVIOUS_APPLICATION_HINT = '您已报名此活动';
  // invitation hints
  INVITATION_HINT = '请点击右上角，选择"发送给朋友"，或"分享到朋友圈"';
  USER_ID = 'user_id';
  LOGIN_HINT = '您需要先登录后，才能报名活动';
  // Event status
  ENROLLING = '报名中';
  ENROLLING_COLOR = '#FF691E';
  IN_SESSION = '进行中';
  IN_SESSION_COLOR = '#5C6BC0';
  ENDED = '已结束';
  ENDED_COLOR = '#C9C9C9';
  // Fetch events from server
  EVENT_TAG = 'event_tag';
}


export default new WebConstants();