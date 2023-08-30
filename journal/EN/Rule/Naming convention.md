#Naming convention

####Files
- Names excluding prefixes should be written in camel case.
- The prefix for a module is m_.
- The prefix for a router is r_.
- The prefix for JavaScript files in the frontend is j_.
- The prefix for schema files is md_.
- Test files should be suffixed with .test after the file intended for testing.
  e.g. : m_user.js => m_user.test.js

####HTML id
- HTML IDs should be written in camel case.
- Write in the format [purpose][tagName]   
  e.g. : todoContainerDiv.
- Exceptions are made for dynamically generated IDs.

####CSS class
- CSS classes should be written in snake case.   
   e.g. : snake_div

- Format: [purpose]_[tagName]_[state]. The [purpose] part can also use camel case, and [state] is optional. If the [tagName] includes a type, like 'input', use snake case for that part.   
  e.g. : toDark_input_button_before

####Variable names
- Variable names should generally use camel case, but constants should use uppercase snake case.
- Avoid using plural forms. If plural is necessary, append "list" to the end.
e.g. : dateList
- Use noun forms.

####Functions
- Functions should be written in camel case.
- Use verbs for function names.

####Objects
- Object names should be in camel case.
- Use nouns for object names.