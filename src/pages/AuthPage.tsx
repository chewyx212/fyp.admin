import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router";
import { authApi } from "../api/authApi";
import { login } from "../app/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { LoginForm, RegisterForm } from "../types/type";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const AuthPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [logForm, setLogForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    const formData: RegisterForm = data;
    if (logForm) {
      const payload: LoginForm = {
        email: formData.email,
        password: formData.password,
      };
      const result = await authApi.login(payload);
      setIsSubmitting(false);
      console.log(result);
      if (result.status === 201) {
        console.log("success");
        console.log(result.data);
        dispatch(
          login({
            token: result.data.token,
            user: {
              name: result.data.user.name,
              email: result.data.user.email,
              organizations: result.data.user.organizations,
              ownOrganizations: result.data.user.ownOrganizations,
            },
          })
        );
        toast({
          title: `Login Successfully`,
          status: "success",
          isClosable: true,
        });
        history.push("/");
      } else if (result.status === 401) {
        console.log("failed");
        console.log(result.data.message);
        toast({
          title: result.data.message,
          status: "error",
          isClosable: true,
        });
      } else {
        console.log("Unknown Error, Try again later");
        toast({
          title: "Unknown Error, Try again later",
          status: "warning",
          isClosable: true,
        });
      }
    } else {
      const result = await authApi.registerAdmin(formData);
      setIsSubmitting(false);
      console.log(result);
      if (result.status === 201) {
        console.log("success");
        setLogForm((prevState) => !prevState);
        toast({
          title: `Account Register Successfully`,
          status: "success",
          isClosable: true,
        });
      } else if (result.status === 409) {
        console.log("failed");
        console.log(result.data.message);
        toast({
          title: result.data.message,
          status: "error",
          isClosable: true,
        });
      } else {
        console.log("Unknown Error, Try again later");
        toast({
          title: "Unknown Error, Try again later",
          status: "warning",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          {logForm ? (
            <Heading fontSize={"4xl"}>Sign in to dashboard.</Heading>
          ) : (
            <Heading fontSize={"3xl"}>Register for your organization.</Heading>
          )}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {!logForm && (
                <FormControl id="name">
                  <FormLabel mt="2" mb="1">
                    Name
                  </FormLabel>

                  {errors.name && (
                    <FormHelperText mt="0" color="red.500">
                      This field is required*
                    </FormHelperText>
                  )}
                  <Input
                    type="text"
                    defaultValue={logForm ? "none" : ""}
                    {...register("name", { required: true })}
                  />
                </FormControl>
              )}
              <FormControl id="email">
                <FormLabel mt="2" mb="1">
                  Email address
                </FormLabel>
                {errors.email && (
                  <FormHelperText mt="0" color="red.500">
                    This field is required*
                  </FormHelperText>
                )}
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel mt="2" mb="1">
                  Password
                </FormLabel>

                {errors.password && (
                  <FormHelperText mt="0" color="red.500">
                    Minimum eight characters, at least one letter and one
                    number*
                  </FormHelperText>
                )}
                <Input
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  })}
                />
              </FormControl>
              {isSubmitting ? (
                <Stack spacing={2} mt="2">
                  <Button
                    isLoading
                    loadingText="Submitting"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.600",
                    }}
                  ></Button>
                </Stack>
              ) : (
                <Stack spacing={2} mt="2">
                  {logForm && (
                    <Link color={"blue.500"} textAlign="end">
                      Forgot password?
                    </Link>
                  )}
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.600",
                    }}
                    type="submit"
                  >
                    {logForm ? "Sign in" : "Register"}
                  </Button>
                  <Button
                    bg={"none"}
                    color={"blue.400"}
                    border="1px"
                    borderColor={"blue.400"}
                    _hover={{
                      bg: "blue.400",
                      color: "white",
                    }}
                    onClick={() => {
                      setLogForm((prevState) => !prevState);
                    }}
                  >
                    {!logForm
                      ? "I have account already"
                      : "Register an account"}
                  </Button>
                </Stack>
              )}
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AuthPage;
