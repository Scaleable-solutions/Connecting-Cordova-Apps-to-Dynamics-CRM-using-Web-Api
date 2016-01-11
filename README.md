# Connecting-Cordova-Apps-to-Dynamics-CRM-using-Web-Api

Microsoft introduced Web Api in Dynamics CRM 2016 which can be accessed easily from .net and non .net alike.
In this tutorial we will learn how to perform Authentication using Azure Active Directory using a plugin from microsoft and execute 
WhoAmI Request and get fullname of the logged in user.

-------------------------------

##How to register an app in Azure Active Directory

[Register a CRM app with Azure Active Directory](https://msdn.microsoft.com/en-us/library/mt622431.aspx)

##Working

This sample uses [Microsoft Azure AD Plugin](https://github.com/AzureAD/azure-activedirectory-library-for-cordova) is included in this sample which do all the work of authentication.

In this sample after authentication two simple network calls are made. First is **WhoAmIRequest** which returns logged in user id and second is **UserInfoRequest** which uses user id from **WhoAmIRequest** and returns fullname of the logged in user.

--------------------

#Conclusion

The given sample is great starter app to perform authentication in cordova apps. It gives a good overview of how you can make connection with CRM in external apps not developed in .NET. You can freely use this sample in your apps for authentication purposes.
