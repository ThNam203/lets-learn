package com.letslive.letslearnbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import com.letslive.letslearnbackend.dto.QuizResponseDTO;
import com.letslive.letslearnbackend.dto.SingleQuizReportDTO;
import com.letslive.letslearnbackend.dto.TopicDTO;
import com.letslive.letslearnbackend.entities.*;
import com.letslive.letslearnbackend.exception.CustomException;
import com.letslive.letslearnbackend.mappers.TopicMapper;
import com.letslive.letslearnbackend.repositories.*;
import com.letslive.letslearnbackend.utils.TimeUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicRepository topicRepository;
    private final TopicQuizRepository topicQuizRepository;
    private final TopicQuizQuestionRepository topicQuizQuestionRepository;
    private final TopicQuizQuestionChoiceRepository topicQuizQuestionChoiceRepository;
    private final TopicAssigmentRepository topicAssigmentRepository;
    private final TopicMeetingRepository topicMeetingRepository;
    private final QuizResponseRepository quizResponseRepository;
    private final AssignmentResponseRepository assignmentResponseRepository;
    private final TopicFileRepository topicFileRepository;
    private final TopicLinkRepository topicLinkRepository;
    private final TopicPageRepository topicPageRepository;
    private final QuizResponseService quizResponseService;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final EnrollmentDetailRepository enrollmentDetailRepository;
    private final AssignmentResponseService assignmentResponseService;

    ObjectMapper mapper = new ObjectMapper()
            .registerModule(new ParameterNamesModule())
            .registerModule(new Jdk8Module())
            .registerModule(new JavaTimeModule());

    public TopicDTO createTopic(TopicDTO topicDTO) {
        Topic topic = TopicMapper.toEntity(topicDTO);
        Topic createdTopic = topicRepository.save(topic);

        // check if there is data, if not then just return
        if (topicDTO.getData() == null || topicDTO.getData().isEmpty()) {
            return TopicMapper.toDTO(createdTopic);
        }

        String createdTopicData;

        switch (topic.getType()) {
            case "quiz":
                try {
                    // save the topic quiz metadata
                    TopicQuiz topicQuiz = mapper.readValue(topicDTO.getData(), TopicQuiz.class);
                    topicQuiz.setTopicId(createdTopic.getId());
                    TopicQuiz createdTopicQuiz = topicQuizRepository.save(topicQuiz);

                    // save the questions and its choices
                    topicQuiz.getQuestions().forEach(question -> {
                        question.setId(null);
                        question.setTopicQuizId(topicQuiz.getId());
                        UUID createdQuestionId = topicQuizQuestionRepository.save(question).getId();

                        question.getChoices().forEach(c -> {
                            c.setQuestionId(createdQuestionId); // Use the ID of the parent question
                            topicQuizQuestionChoiceRepository.save(c);
                        });
                    });

                    TopicQuiz finalTopicQuizSaved = topicQuizRepository
                            .findById(createdTopicQuiz.getId())
                            .orElseThrow(() -> new CustomException("Something unexpected happened!", HttpStatus.INTERNAL_SERVER_ERROR));

                    createdTopicData = mapper.writeValueAsString(finalTopicQuizSaved);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing quiz data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "assignment":
                try {
                    TopicAssignment topicAssigment = mapper.readValue(topicDTO.getData(), TopicAssignment.class);
                    topicAssigment.setId(null);
                    topicAssigment.setTopicId(createdTopic.getId());
                    TopicAssignment createdTopicAssigment = topicAssigmentRepository.save(topicAssigment);
                    createdTopicData = mapper.writeValueAsString(createdTopicAssigment);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing assigment data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "meeting":
                try {
                    TopicMeeting topicMeeting = mapper.readValue(topicDTO.getData(), TopicMeeting.class);
                    topicMeeting.setId(null);
                    topicMeeting.setTopicId(createdTopic.getId());
                    TopicMeeting createdTopicMeeting = topicMeetingRepository.save(topicMeeting);
                    createdTopicData = mapper.writeValueAsString(createdTopicMeeting);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing meeting data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "file":
                try {
                    TopicFile topicFile = mapper.readValue(topicDTO.getData(), TopicFile.class);
                    topicFile.setId(null);
                    topicFile.setTopicId(createdTopic.getId());
                    TopicFile createdTopicFile = topicFileRepository.save(topicFile);
                    createdTopicData = mapper.writeValueAsString(createdTopicFile);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing file data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "link":
                try {
                    TopicLink topicLink = mapper.readValue(topicDTO.getData(), TopicLink.class);
                    topicLink.setId(null);
                    topicLink.setTopicId(createdTopic.getId());
                    TopicLink createdTopicLink = topicLinkRepository.save(topicLink);
                    createdTopicData = mapper.writeValueAsString(createdTopicLink);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing link data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "page":
                try {
                    TopicPage topicPage = mapper.readValue(topicDTO.getData(), TopicPage.class);
                    topicPage.setId(null);
                    topicPage.setTopicId(createdTopic.getId());
                    TopicPage createdTopicPage = topicPageRepository.save(topicPage);
                    createdTopicData = mapper.writeValueAsString(createdTopicPage);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing page data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            default:
                throw new CustomException("Topic type not found!", HttpStatus.BAD_REQUEST);
        }

        TopicDTO createdTopicDTO = TopicMapper.toDTO(createdTopic);
        createdTopicDTO.setData(createdTopicData);

        return createdTopicDTO;
    }

    public TopicDTO updateTopic(TopicDTO topicDTO) {
        if (!topicRepository.existsById(topicDTO.getId())) {
            throw new CustomException("No topic found!", HttpStatus.NOT_FOUND);
        }
        Topic updatedTopic = topicRepository.save(TopicMapper.toEntity(topicDTO));

        // check if there is data, if not then just return
        if (topicDTO.getData() == null || topicDTO.getData().isEmpty()) {
            return TopicMapper.toDTO(updatedTopic);
        }

        TopicDTO updatedTopicDTO = TopicMapper.toDTO(updatedTopic);

        switch (topicDTO.getType().toLowerCase()) {
            case "quiz":
                try {
                    // update the topic quiz metadata
                    TopicQuiz topicQuiz = mapper.readValue(topicDTO.getData(), TopicQuiz.class);
                    topicQuizRepository.findById(topicQuiz.getId()).orElseThrow(() -> new CustomException("No topic quiz found!", HttpStatus.NOT_FOUND));
                    topicQuizRepository.save(topicQuiz);

                    // remove every questions and choices in topic quiz
                    List<TopicQuizQuestion> topicQuizQuestions = topicQuizQuestionRepository.findAllByTopicQuizId(topicQuiz.getId());
                    topicQuizQuestions.forEach(topicQuizQuestion -> {
                        topicQuizQuestion.getChoices().forEach(choice -> {
                            topicQuizQuestionChoiceRepository.deleteById(choice.getId());
                        });

                        topicQuizQuestionRepository.deleteById(topicQuizQuestion.getId());
                    });

                    // save the questions and its choices
                    topicQuiz.getQuestions().forEach(question -> {
                        question.setId(null);
                        question.setTopicQuizId(topicQuiz.getId());
                        UUID createdQuestionId = topicQuizQuestionRepository.save(question).getId();

                        question.getChoices().forEach(c -> {
                            c.setId(null); // remove "set id", generate a new id please
                            c.setQuestionId(createdQuestionId); // Use the ID of the parent question
                            topicQuizQuestionChoiceRepository.save(c);
                        });
                    });

                    // BUG: RETURNING OLD DATA
                    topicQuizRepository.flush();
                    TopicQuiz updatedTopicQuizData = topicQuizRepository.findById(topicQuiz.getId()).orElseThrow(() -> new CustomException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR));
                    updatedTopicDTO.setData(mapper.writeValueAsString(updatedTopicQuizData));
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing quiz data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                } catch (Exception e) {
                    throw new CustomException("Something went wrong: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                }
                break;
            case "assignment":
                try {
                    TopicAssignment topicAssigment = mapper.readValue(topicDTO.getData(), TopicAssignment.class);
                    if (!topicAssigmentRepository.existsById(topicAssigment.getId())) {
                        throw new CustomException("Assigment not found!", HttpStatus.NOT_FOUND);
                    }
                    TopicAssignment createdTopicAssigment = topicAssigmentRepository.save(topicAssigment);
                    updatedTopicDTO.setData(mapper.writeValueAsString(createdTopicAssigment));
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing assigment data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }

                break;
            case "meeting":
                try {
                    TopicMeeting topicMeeting = mapper.readValue(topicDTO.getData(), TopicMeeting.class);
                    if (!topicMeetingRepository.existsById(topicMeeting.getId())) {
                        throw new CustomException("Assigment not found!", HttpStatus.NOT_FOUND);
                    }
                    TopicMeeting updatedTopicMeeting = topicMeetingRepository.save(topicMeeting);
                    updatedTopicDTO.setData(mapper.writeValueAsString(updatedTopicMeeting));
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing meeting data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "file":
                try {
                    TopicFile topicFile = mapper.readValue(topicDTO.getData(), TopicFile.class);
                    if (!topicFileRepository.existsById(topicFile.getId())) {
                        throw new CustomException("Assigment not found!", HttpStatus.NOT_FOUND);
                    }
                    TopicFile updatedTopicFile = topicFileRepository.save(topicFile);
                    updatedTopicDTO.setData(mapper.writeValueAsString(updatedTopicFile));
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing file data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "link":
                try {
                    TopicLink topicLink = mapper.readValue(topicDTO.getData(), TopicLink.class);
                    if (!topicLinkRepository.existsById(topicLink.getId())) {
                        throw new CustomException("Assigment not found!", HttpStatus.NOT_FOUND);
                    }
                    TopicLink updatedTopicLink = topicLinkRepository.save(topicLink);
                    updatedTopicDTO.setData(mapper.writeValueAsString(updatedTopicLink));
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing link data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "page":
                try {
                    TopicPage topicPage = mapper.readValue(topicDTO.getData(), TopicPage.class);
                    if (!topicPageRepository.existsById(topicPage.getId())) {
                        throw new CustomException("Assigment not found!", HttpStatus.NOT_FOUND);
                    }
                    TopicPage updateTopicPage = topicPageRepository.save(topicPage);
                    updatedTopicDTO.setData(mapper.writeValueAsString(updateTopicPage));
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing link data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            default:
                throw new CustomException("Topic type not found!", HttpStatus.BAD_REQUEST);
        }

        return updatedTopicDTO;
    }

    public void deleteTopic(UUID id) {
        topicRepository.deleteById(id);
    }

    public TopicDTO getTopicById(UUID id, UUID userId) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new CustomException("No topic found!", HttpStatus.NOT_FOUND));
        String topicData;
        String studentResponseData = null;

        switch (topic.getType()) {
            case "quiz":
                TopicQuiz topicQuiz = topicQuizRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No topic quiz found!", HttpStatus.NOT_FOUND));
                try {
                    topicData = mapper.writeValueAsString(topicQuiz);
                    List<QuizResponse> res = quizResponseRepository.findByTopicIdAndStudentId(topicQuiz.getTopicId(), userId);
                    studentResponseData = mapper.writeValueAsString(res);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing quiz data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "assignment":
                TopicAssignment topicAssignment = topicAssigmentRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No assignment found!", HttpStatus.NOT_FOUND));
                try {
                    topicData = mapper.writeValueAsString(topicAssignment);
                    Optional<AssignmentResponse> res = assignmentResponseRepository.findByTopicIdAndStudentId(topicAssignment.getTopicId(), userId);
                    if (res.isPresent()) studentResponseData = mapper.writeValueAsString(res);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing assigment data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "meeting":
                TopicMeeting topicMeeting = topicMeetingRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No meeting found!", HttpStatus.NOT_FOUND));
                try {
                    topicData = mapper.writeValueAsString(topicMeeting);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing meeting data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "file":
                TopicFile topicFile = topicFileRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No file found!", HttpStatus.NOT_FOUND));
                try {
                    topicData = mapper.writeValueAsString(topicFile);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing file data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "link":
                TopicLink topicLink = topicLinkRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No file found!", HttpStatus.NOT_FOUND));
                try {
                    topicData = mapper.writeValueAsString(topicLink);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing link data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            case "page":
                TopicPage topicPage = topicPageRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No page found!", HttpStatus.NOT_FOUND));
                try {
                    topicData = mapper.writeValueAsString(topicPage);
                } catch (JsonProcessingException e) {
                    throw new CustomException("Error parsing page data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
                }
                break;
            default:
                throw new CustomException("Topic type not found!", HttpStatus.BAD_REQUEST);
        }

        TopicDTO createdTopicDTO = TopicMapper.toDTO(topic);
        createdTopicDTO.setData(topicData);
        createdTopicDTO.setResponse(studentResponseData);

        return createdTopicDTO;
    }

    public SingleAssignmentReportDTO getSingleAssignmentReport(UUID courseId, UUID topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new CustomException("No topic found!", HttpStatus.NOT_FOUND));
        TopicAssignment topicQuiz = topicAssigmentRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No topic assignment found!", HttpStatus.NOT_FOUND));
        List<AssignmentResponse> assignmentResponses = assignmentResponseRepository.findAllByTopicId(topic.getId());
        LocalDateTime topicEndTime = topicQuiz.getClose() == null ? LocalDateTime.MAX : TimeUtils.convertStringToLocalDateTime(topicQuiz.getClose());
        int studentCount = enrollmentDetailRepository.countByCourseIdAndJoinDateLessThanEqual(courseId, topicEndTime);

        Map<UUID, Double> marksWithStudentId = assignmentResponses.stream()
                .filter(res -> res.getMark() != null)
                .collect(Collectors.toMap(
                        res -> res.getStudent().getId(),
                        AssignmentResponse::getMark,
                        (existing, replacement) -> existing
                ));

        Map<String, Long> fileTypeCount = assignmentResponses.stream()
                .filter(res -> res.getCloudinaryFiles() != null)
                .flatMap(res -> res.getCloudinaryFiles().stream())
                .map(file -> {
                    int dotIndex = file.getName().lastIndexOf('.');
                    return file.getDisplayUrl().substring(dotIndex + 1);
                })
                .collect(Collectors.groupingBy(
                        ext -> ext,
                        Collectors.counting()
                ));

        SingleAssignmentReportDTO reportDTO = new SingleAssignmentReportDTO();
        reportDTO.setName(topic.getTitle());
        reportDTO.setStudentMarks(marksWithStudentId);
        reportDTO.setMarkDistributionByPercentage(calculateMarkDistribution(marksWithStudentId, studentCount));
        reportDTO.setSubmissionCount(assignmentResponses.size());
        reportDTO.setGradedSubmissionCount(assignmentResponses.stream().filter(res -> res.getMark() != null).count());
        reportDTO.setFileCount(assignmentResponses.stream().mapToInt(res -> res.getCloudinaryFiles() != null ? res.getCloudinaryFiles().size() : 0).sum());
        reportDTO.setAvgMark(assignmentResponses.stream().filter(res -> res.getMark() != null).mapToDouble(AssignmentResponse::getMark).average().orElse(0.0));
        reportDTO.setMaxMark(assignmentResponses.stream().filter(res -> res.getMark() != null).mapToDouble(AssignmentResponse::getMark).max().orElse(0.0));
        reportDTO.setCompletionRate((double) assignmentResponses.size() / (double) studentCount);
        reportDTO.setStudentCount(studentCount);
        reportDTO.setFileTypeCount(fileTypeCount);

        return reportDTO;
    }

    public SingleQuizReportDTO getSingleQuizReport(UUID courseId, UUID topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new CustomException("No topic found!", HttpStatus.NOT_FOUND));
        SingleQuizReportDTO reportDTO = new SingleQuizReportDTO();

        TopicQuiz topicQuiz = topicQuizRepository.findByTopicId(topic.getId()).orElseThrow(() -> new CustomException("No topic quiz found!", HttpStatus.NOT_FOUND));
        List<QuizResponseDTO> quizResponses = quizResponseService.getAllQuizResponsesByTopicId(topicQuiz.getTopicId());
        LocalDateTime topicEndTime = topicQuiz.getClose() == null ? LocalDateTime.MAX : TimeUtils.convertStringToLocalDateTime(topicQuiz.getClose());
        int studentCount = enrollmentDetailRepository.countByCourseIdAndJoinDateLessThanEqual(courseId, topicEndTime);

        Map<UUID, Double> marksWithStudentId = quizResponses.stream()
                .flatMap(responseDTO -> responseDTO.getAnswers().stream().map(answer -> {
                    try {
                        Question question = mapper.readValue(answer.getQuestion(), Question.class);
                        double normalizedMark = (answer.getMark() / question.getDefaultMark()) * 10; // Normalize to base 10
                        return new AbstractMap.SimpleEntry<>(responseDTO.getStudent().getId(), normalizedMark);
                    } catch (JsonProcessingException e) {
                        throw new CustomException("Error parsing question data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }))
                .collect(Collectors.groupingBy(
                        Map.Entry::getKey, // Group by studentId
                        Collectors.mapping(
                                Map.Entry::getValue, // Extract the marks
                                Collectors.toList() // Collect marks into a list
                        )
                ))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey, // Keep the studentId as the key
                        entry -> calculateMark(entry.getValue(), topicQuiz.getGradingMethod()) // Calculate the grade based on the method
                ));

        double avgMark = marksWithStudentId.values().stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0); // Default to 0.0 if no marks exist

        double maxMark = marksWithStudentId.values().stream()
                .mapToDouble(Double::doubleValue)
                .max()
                .orElse(0.0); // Default to 0.0 if no marks exist

        double minMark = marksWithStudentId.values().stream()
                .mapToDouble(Double::doubleValue)
                .min()
                .orElse(0.0); // Default to 0.0 if no marks exist


        reportDTO.setName(topic.getTitle());
        reportDTO.setStudentWithMark(marksWithStudentId);
        reportDTO.setMarkDistributionByPercentage(calculateMarkDistribution(marksWithStudentId, studentCount));
        reportDTO.setQuestionCount(topicQuiz.getQuestions().size());
        reportDTO.setMaxDefaultMark(topicQuiz.getQuestions().stream().mapToDouble(TopicQuizQuestion::getDefaultMark).sum());
        reportDTO.setAvgStudentMarkBase10(avgMark);
        reportDTO.setMaxStudentMarkBase10(maxMark);
        reportDTO.setMinStudentMarkBase10(minMark);
        reportDTO.setAttemptCount(quizResponses.size());
        reportDTO.setAvgTimeSpend(calculateAvgTimeSpend(quizResponses));
        reportDTO.setCompletionRate(((double)marksWithStudentId.entrySet().size()) / ((double)studentCount));
        reportDTO.setStudentCount(studentCount);
        reportDTO.setTrueFalseQuestionCount(countQuestionType(quizResponses, "True/False"));
        reportDTO.setMultipleChoiceQuestionCount(countQuestionType(quizResponses, "Choices Answer"));
        reportDTO.setShortAnswerQuestionCount(countQuestionType(quizResponses, "Short Answer"));

        return reportDTO;
    }

    private double calculateMark(List<Double> marks, String method) {
        return switch (method) {
            case "Highest Grade" -> marks.stream().max(Double::compare).orElse(0.0);
            case "Average Grade" -> marks.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            case "First Grade" -> marks.isEmpty() ? 0.0 : marks.get(0);
            case "Last Grade" -> marks.isEmpty() ? 0.0 : marks.get(marks.size() - 1);
            default -> throw new IllegalArgumentException("Invalid method: " + method);
        };
    }

    private double calculateAvgTimeSpend(List<QuizResponseDTO> quizResponses) {
        return quizResponses
                .stream()
                .mapToDouble(res -> (TimeUtils.convertStringToLocalDateTime(res.getCompletedAt()).getSecond() - TimeUtils.convertStringToLocalDateTime(res.getStartedAt()).getSecond()))
                .average()
                .orElse(0.0);
    }

    private Number countQuestionType(List<QuizResponseDTO> quizResponses, String questionType) {
        return quizResponses.stream()
                .flatMap(responseDTO -> responseDTO.getAnswers().stream())
                .mapToInt(answer -> {
                    try {
                        Question question = mapper.readValue(answer.getQuestion(), Question.class);
                        return question.getType().equals(questionType) ? 1 : 0;
                    } catch (JsonProcessingException e) {
                        throw new CustomException("Error parsing question data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                })
                .sum();
    }

    public Map<Number, Double> calculateMarkDistribution(Map<UUID, Double> studentsWithMark, int studentCount) {
        List<Double> allMarks = studentsWithMark.values().stream().toList();

        // Count how many marks fall into each range
        long count8OrMore = allMarks.stream().filter(mark -> mark >= 8).count();
        long count5To7 = allMarks.stream().filter(mark -> mark >= 5 && mark < 8).count();
        long count2To4 = allMarks.stream().filter(mark -> mark >= 2 && mark < 5).count();
        long count0To1 = allMarks.stream().filter(mark -> mark >= 0 && mark < 2).count();

        Map<Number, Double> percentageMap = new HashMap<>();

        // Calculate the percentage for each range
        percentageMap.put(8, (count8OrMore * 100.0) / studentCount);
        percentageMap.put(5, (count5To7 * 100.0) / studentCount);
        percentageMap.put(2, (count2To4 * 100.0) / studentCount);
        percentageMap.put(0, (count0To1 * 100.0) / studentCount);
        percentageMap.put(-1, (((long)studentCount - count0To1 - count2To4 - count5To7 - count8OrMore) * 100.0) / studentCount);

        return percentageMap;
    }
}
