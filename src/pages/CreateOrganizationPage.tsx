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
import { updateUserInfo } from "../app/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { organizationApi } from "../api/organizationApi";
import { CreateOrganizationForm } from "../types/type";

const CreateOrganizationPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationForm>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<CreateOrganizationForm> = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    const payload: CreateOrganizationForm = {
      name: data.name,
      address: data.address,
    };
    const result = await organizationApi.createOrganization(payload);
    setIsSubmitting(false);
    console.log(result);
    if (result.status === 201) {
      console.log("success");
      console.log(result.data);
      dispatch(
        updateUserInfo({
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
  };

  return (
    <Stack
      minH={"100vh"}
      spacing={8}
      mx={"auto"}
      maxW={"lg"}
      py={12}
      px={6}
      align={"center"}
      justify={"center"}
    >
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Create your organization.</Heading>
      </Stack>
      <Box
        minW={"30vw"}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="name">
              <FormLabel mt="2" mb="1">
                Name
              </FormLabel>
              {errors.name && (
                <FormHelperText mt="0" color="red.500">
                  This field is required*
                </FormHelperText>
              )}
              <Input type="text" {...register("name", { required: true })} />
            </FormControl>
            <FormControl id="address">
              <FormLabel mt="2" mb="1">
                Address
              </FormLabel>

              {errors.address && (
                <FormHelperText mt="0" color="red.500">
                  This field is required*
                </FormHelperText>
              )}
              <Input
                type="address"
                {...register("address", {
                  required: true,
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
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.600",
                  }}
                  type="submit"
                >
                  Create Organization
                </Button>
              </Stack>
            )}
          </form>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CreateOrganizationPage;
